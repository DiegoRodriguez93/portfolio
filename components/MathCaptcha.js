import { useState, useEffect, useRef } from "react";

const MathCaptcha = ({ onValidationChange, reset }) => {
  const canvasRef = useRef(null);
  const [num1, setNum1] = useState(0);
  const [num2, setNum2] = useState(0);
  const [userAnswer, setUserAnswer] = useState("");
  const [isValid, setIsValid] = useState(false);

  // Generate new math problem
  const generateProblem = () => {
    const n1 = Math.floor(Math.random() * 9) + 1; // 1-9
    const n2 = Math.floor(Math.random() * 9) + 1; // 1-9
    setNum1(n1);
    setNum2(n2);
    setUserAnswer("");
    setIsValid(false);
    return { n1, n2 };
  };

  // Draw captcha on canvas
  const drawCaptcha = (n1, n2) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Set canvas background
    ctx.fillStyle = "#1a1a2e";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Add some noise/lines for security
    ctx.strokeStyle = "#ffffff20";
    ctx.lineWidth = 1;
    for (let i = 0; i < 5; i++) {
      ctx.beginPath();
      ctx.moveTo(Math.random() * canvas.width, Math.random() * canvas.height);
      ctx.lineTo(Math.random() * canvas.width, Math.random() * canvas.height);
      ctx.stroke();
    }

    // Add some random dots
    ctx.fillStyle = "#ffffff15";
    for (let i = 0; i < 10; i++) {
      ctx.beginPath();
      ctx.arc(
        Math.random() * canvas.width,
        Math.random() * canvas.height,
        Math.random() * 3 + 1,
        0,
        2 * Math.PI
      );
      ctx.fill();
    }

    // Draw the math equation
    ctx.fillStyle = "#ffffff";
    ctx.font = "bold 28px Arial";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";

    const centerY = canvas.height / 2;
    const equation = `${n1} + ${n2} = ?`;

    // Add slight rotation and position variation for each character
    const chars = equation.split("");
    const startX = canvas.width / 2 - (chars.length * 15) / 2;

    chars.forEach((char, index) => {
      ctx.save();
      const x = startX + index * 20;
      const rotation = (Math.random() - 0.5) * 0.3; // Slight rotation
      const yOffset = (Math.random() - 0.5) * 8; // Slight vertical offset

      ctx.translate(x, centerY + yOffset);
      ctx.rotate(rotation);
      ctx.fillText(char, 0, 0);
      ctx.restore();
    });
  };

  // Initialize captcha
  useEffect(() => {
    const problem = generateProblem();
    drawCaptcha(problem.n1, problem.n2);
  }, []);

  // Reset captcha when parent component resets
  useEffect(() => {
    if (reset) {
      const problem = generateProblem();
      drawCaptcha(problem.n1, problem.n2);
    }
  }, [reset]);

  // Validate answer
  useEffect(() => {
    const correctAnswer = num1 + num2;
    const isCorrect = parseInt(userAnswer) === correctAnswer;
    setIsValid(isCorrect);
    onValidationChange(isCorrect, userAnswer);
  }, [userAnswer, num1, num2, onValidationChange]);

  const handleRefresh = () => {
    const problem = generateProblem();
    drawCaptcha(problem.n1, problem.n2);
  };

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center gap-4">
        <div className="relative">
          <canvas
            ref={canvasRef}
            width={220}
            height={45}
            className="border border-white/30 rounded bg-primary/20"
          />
        </div>
        <button
          type="button"
          onClick={handleRefresh}
          className="text-white/70 hover:text-accent transition-colors text-sm bg-primary/30 border border-white/20 rounded px-3 py-2"
          title="Generate new captcha"
        >
          🔄
        </button>
      </div>
      <div className="flex items-center gap-2">
        <input
          type="number"
          value={userAnswer}
          onChange={(e) => setUserAnswer(e.target.value)}
          placeholder="Math"
          className="input flex-1 max-w-[80px]"
          required
        />
        {userAnswer && (
          <span
            className={`text-sm ${isValid ? "text-green-400" : "text-red-400"}`}
          >
            {isValid ? "✓" : "✗"}
          </span>
        )}
      </div>
    </div>
  );
};

export default MathCaptcha;
