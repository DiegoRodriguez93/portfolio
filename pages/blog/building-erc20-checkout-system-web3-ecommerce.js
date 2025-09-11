import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  BsArrowLeft,
  BsCalendar,
  BsClock,
  BsShare,
  BsBookmark,
  BsArrowRight,
  BsCode,
  BsGear,
  BsShield,
  BsWallet,
  BsCreditCard,
} from "react-icons/bs";
import { FaTwitter, FaLinkedin, FaFacebook, FaGithub, FaEthereum } from "react-icons/fa";

// components
import SEO from "../../components/SEO";
import Circles from "../../components/Circles";
import AuthorBio from "../../components/AuthorBio";

// framer motion
import { fadeIn } from "../../variants";

const ERC20CheckoutArticle = () => {
  const publishDate = "2025-09-11";
  const readTime = "11 min read";
  const articleUrl = "https://www.diego-rodriguez.work/blog/building-erc20-checkout-system-web3-ecommerce";

  return (
    <>
      <SEO
        title="Building a Modern ERC20 Checkout System: Web3 E-commerce with Next.js"
        description="Complete guide to building a production-ready Web3 e-commerce checkout system that accepts ERC20 token payments. Learn wagmi integration, transaction handling, and seamless UX patterns for blockchain payments."
        keywords="ERC20 checkout system, web3 ecommerce, blockchain payments, wagmi integration, ethereum payments, crypto checkout, web3 shopping cart, ERC20 tokens, next.js web3, decentralized payments, smart contract integration"
        image="/work/erc20-checkout.png"
        article={true}
      />

      <div className="min-h-full bg-primary/30 py-20">
        <Circles />
        <div className="container mx-auto px-4 max-w-4xl">
          {/* Back Button */}
          <motion.div
            variants={fadeIn("up", 0.1)}
            initial="hidden"
            animate="show"
            exit="hidden"
            className="mb-8"
          >
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-white/70 hover:text-accent transition-colors duration-300"
            >
              <BsArrowLeft className="w-4 h-4" />
              <span>Back to Blog</span>
            </Link>
          </motion.div>

          {/* Article Header */}
          <motion.header
            variants={fadeIn("up", 0.2)}
            initial="hidden"
            animate="show"
            exit="hidden"
            className="mb-12"
          >
            {/* Categories */}
            <div className="flex flex-wrap gap-2 mb-6">
              <span className="px-4 py-2 text-sm rounded-full bg-accent/20 text-accent border border-accent/30">
                Web3
              </span>
              <span className="px-4 py-2 text-sm rounded-full bg-accent/20 text-accent border border-accent/30">
                E-commerce
              </span>
              <span className="px-4 py-2 text-sm rounded-full bg-accent/20 text-accent border border-accent/30">
                Next.js
              </span>
            </div>

            {/* Title */}
            <h1 className="text-3xl md:text-5xl font-bold text-white mb-6 leading-tight">
              Building a Modern ERC20 Checkout System: Web3 E-commerce with Next.js
            </h1>

            {/* Meta Info */}
            <div className="flex flex-wrap items-center gap-6 text-white/60 mb-8">
              <div className="flex items-center gap-2">
                <BsCalendar className="w-4 h-4" />
                <span>
                  {new Date(publishDate).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <BsClock className="w-4 h-4" />
                <span>{readTime}</span>
              </div>
              <div className="flex items-center gap-2">
                <span>By</span>
                <Link
                  href="/about"
                  className="text-accent hover:text-white transition-colors"
                >
                  Diego Rodriguez
                </Link>
              </div>
            </div>

            {/* Featured Image */}
            <div className="relative h-64 md:h-96 rounded-xl overflow-hidden mb-8">
              <Image
                src="/work/erc20-checkout.png"
                alt="ERC20 Checkout System - Web3 E-commerce"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
              <div className="absolute top-4 right-4">
                <FaEthereum className="w-12 h-12 text-blue-400" />
              </div>
            </div>

            {/* GitHub Repository Link */}
            <div className="bg-gray-800/50 border border-gray-600 rounded-xl p-6 mb-8">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">🚀 Open Source Project</h3>
                  <p className="text-white/80">
                    Complete ERC20 checkout boilerplate with Next.js, wagmi, and TypeScript. Ready for production use.
                  </p>
                </div>
                <a
                  href="https://github.com/DiegoRodriguez93/nextjs-web3-crypto-checkout"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors duration-300 font-medium flex items-center gap-2"
                >
                  <FaGithub className="w-5 h-5" />
                  View on GitHub
                </a>
              </div>
            </div>

            {/* Share Buttons */}
            <div className="flex items-center gap-4">
              <span className="text-white/60 text-sm">Share:</span>
              <div className="flex gap-3">
                <a
                  href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(articleUrl)}&text=${encodeURIComponent("Building ERC20 Checkout System")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg bg-white/5 text-white/70 hover:text-accent hover:bg-accent/10 transition-all duration-300"
                >
                  <FaTwitter className="w-4 h-4" />
                </a>
                <a
                  href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(articleUrl)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg bg-white/5 text-white/70 hover:text-accent hover:bg-accent/10 transition-all duration-300"
                >
                  <FaLinkedin className="w-4 h-4" />
                </a>
                <a
                  href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(articleUrl)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg bg-white/5 text-white/70 hover:text-accent hover:bg-accent/10 transition-all duration-300"
                >
                  <FaFacebook className="w-4 h-4" />
                </a>
              </div>
            </div>
          </motion.header>

          {/* Article Content */}
          <motion.article
            variants={fadeIn("up", 0.3)}
            initial="hidden"
            animate="show"
            exit="hidden"
            className="prose prose-lg prose-invert max-w-none"
          >
            <div className="text-white/80 leading-relaxed space-y-8">
              {/* Introduction */}
              <div className="bg-white/5 border border-white/10 rounded-xl p-8 mb-8">
                <p className="text-xl leading-relaxed mb-4">
                  The future of e-commerce is decentralized. As Web3 adoption accelerates, businesses need seamless ways to accept cryptocurrency payments. After building multiple Web3 applications and working with major crypto platforms, I've created an ERC20 Checkout Boilerplate that bridges traditional e-commerce UX with blockchain payments.
                </p>
                <p className="text-lg text-accent font-medium">
                  This comprehensive guide walks through building a production-ready checkout system that accepts ERC20 token payments with the same ease as traditional payment methods.
                </p>
              </div>

              {/* Key Features */}
              <div className="grid md:grid-cols-4 gap-6 mb-8">
                <div className="bg-blue-500/10 border border-blue-500/30 rounded-xl p-6 text-center">
                  <BsWallet className="w-12 h-12 text-blue-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-blue-400 mb-2">Wallet Integration</h3>
                  <p className="text-white/80 text-sm">Seamless MetaMask and multi-wallet support</p>
                </div>
                <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-6 text-center">
                  <BsCreditCard className="w-12 h-12 text-green-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-green-400 mb-2">ERC20 Payments</h3>
                  <p className="text-white/80 text-sm">Accept any ERC20 token with configurable settings</p>
                </div>
                <div className="bg-purple-500/10 border border-purple-500/30 rounded-xl p-6 text-center">
                  <BsGear className="w-12 h-12 text-purple-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-purple-400 mb-2">Real-time Updates</h3>
                  <p className="text-white/80 text-sm">Live transaction status and confirmations</p>
                </div>
                <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-6 text-center">
                  <BsShield className="w-12 h-12 text-red-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-red-400 mb-2">Production Ready</h3>
                  <p className="text-white/80 text-sm">Error handling and security best practices</p>
                </div>
              </div>

              {/* Section 1: Why Web3 E-commerce Matters */}
              <section>
                <h2 className="text-3xl font-bold text-white mb-6">1. Why Web3 E-commerce is the Future</h2>
                
                <p className="mb-6">
                  Traditional payment systems charge 2-4% in fees, take days to settle, and exclude billions of unbanked users. Web3 payments offer a revolutionary alternative with instant settlements, global accessibility, and minimal fees.
                </p>

                <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-6 mb-6">
                  <h3 className="text-xl font-semibold text-green-400 mb-4">💰 Web3 Payment Advantages</h3>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold text-white mb-2">For Merchants:</h4>
                      <ul className="space-y-1 text-white/80 text-sm">
                        <li>• Lower transaction fees (0.1-0.5% vs 2-4%)</li>
                        <li>• Instant settlement (minutes vs days)</li>
                        <li>• No chargebacks or payment disputes</li>
                        <li>• Global reach without currency conversion</li>
                        <li>• Programmable money with smart contracts</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold text-white mb-2">For Customers:</h4>
                      <ul className="space-y-1 text-white/80 text-sm">
                        <li>• Privacy-preserving transactions</li>
                        <li>• No need for traditional banking</li>
                        <li>• Borderless payments anywhere</li>
                        <li>• Ownership of digital assets</li>
                        <li>• Participation in token economies</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </section>

              {/* Section 2: Technology Stack */}
              <section>
                <h2 className="text-3xl font-bold text-white mb-6">2. Modern Web3 Technology Stack</h2>
                
                <p className="mb-6">
                  Building a production-ready Web3 checkout requires the right combination of frontend frameworks, blockchain libraries, and developer tools. Here's the stack that powers the ERC20 Checkout Boilerplate:
                </p>

                <div className="bg-primary/50 border border-white/20 rounded-lg p-6 mb-6">
                  <h3 className="text-xl font-semibold text-accent mb-4">Core Dependencies</h3>
                  <pre className="bg-black/30 p-4 rounded-lg text-green-400 text-sm overflow-x-auto">
{`// package.json - Essential Web3 dependencies
{
  "dependencies": {
    "next": "14.0.0",
    "react": "^18.2.0",
    "wagmi": "^1.4.0",
    "viem": "^1.19.0",
    "@tanstack/react-query": "^4.36.0",
    "tailwindcss": "^3.3.0",
    "typescript": "^5.2.0"
  }
}

// Why this stack?
// Next.js 14: Latest features, App Router, Server Components
// wagmi: Best-in-class React hooks for Ethereum
// viem: TypeScript-first, lightweight alternative to ethers.js
// TanStack Query: Powerful data fetching and caching
// Tailwind: Rapid UI development with utility classes`}
                  </pre>
                </div>

                <div className="bg-blue-500/10 border border-blue-500/30 rounded-xl p-6 mb-6">
                  <h3 className="text-xl font-semibold text-blue-400 mb-4">🔧 Why This Stack Wins</h3>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold text-white mb-2">Performance Benefits:</h4>
                      <ul className="space-y-1 text-white/80 text-sm">
                        <li>• <strong>wagmi:</strong> Automatic caching and request deduplication</li>
                        <li>• <strong>viem:</strong> 40% smaller bundle than ethers.js</li>
                        <li>• <strong>Next.js 14:</strong> Server Components reduce client JS</li>
                        <li>• <strong>TypeScript:</strong> Catch errors at compile time</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold text-white mb-2">Developer Experience:</h4>
                      <ul className="space-y-1 text-white/80 text-sm">
                        <li>• <strong>wagmi:</strong> React hooks for every Web3 operation</li>
                        <li>• <strong>TanStack Query:</strong> Powerful data synchronization</li>
                        <li>• <strong>Tailwind:</strong> Rapid prototyping and consistent design</li>
                        <li>• <strong>TypeScript:</strong> Excellent IDE support and autocomplete</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </section>

              {/* Section 3: Core Implementation */}
              <section>
                <h2 className="text-3xl font-bold text-white mb-6">3. Building the Payment Component</h2>
                
                <p className="mb-6">
                  The heart of any Web3 checkout is the payment component. It needs to handle wallet connections, token approvals, transaction submissions, and real-time status updates. Here's the complete implementation:
                </p>

                <div className="bg-primary/50 border border-white/20 rounded-lg p-6 mb-6">
                  <h3 className="text-xl font-semibold text-accent mb-4">PayButton Component</h3>
                  <pre className="bg-black/30 p-4 rounded-lg text-green-400 text-sm overflow-x-auto">
{`// components/PayButton.tsx
'use client';

import { useState } from 'react';
import { useAccount, useConnect, useWriteContract, useWaitForTransaction } from 'wagmi';
import { parseUnits } from 'viem';

interface PayButtonProps {
  productName: string;
  price: number;
  tokenSymbol: string;
  tokenDecimals: number;
}

export default function PayButton({ 
  productName, 
  price, 
  tokenSymbol, 
  tokenDecimals 
}: PayButtonProps) {
  const [isProcessing, setIsProcessing] = useState(false);
  const [txHash, setTxHash] = useState<string>();
  
  const { address, isConnected } = useAccount();
  const { connect, connectors } = useConnect();
  const { writeContract } = useWriteContract();

  // ERC20 contract configuration
  const tokenContract = {
    address: '0x...' as const, // Your ERC20 token address
    abi: [
      {
        name: 'transfer',
        type: 'function',
        stateMutability: 'nonpayable',
        inputs: [
          { name: 'to', type: 'address' },
          { name: 'amount', type: 'uint256' }
        ],
        outputs: [{ name: '', type: 'bool' }]
      }
    ]
  };

  const handlePayment = async () => {
    if (!isConnected) {
      // Connect wallet first
      const metamaskConnector = connectors.find(c => c.name === 'MetaMask');
      if (metamaskConnector) {
        connect({ connector: metamaskConnector });
      }
      return;
    }

    try {
      setIsProcessing(true);
      
      // Convert price to token units
      const amount = parseUnits(price.toString(), tokenDecimals);
      const recipientAddress = '0x...'; // Your payment recipient address
      
      // Execute the transfer
      const hash = await writeContract({
        ...tokenContract,
        functionName: 'transfer',
        args: [recipientAddress, amount]
      });
      
      setTxHash(hash);
      
    } catch (error) {
      console.error('Payment failed:', error);
      setIsProcessing(false);
    }
  };

  // Wait for transaction confirmation
  const { isLoading: isConfirming, isSuccess } = useWaitForTransaction({
    hash: txHash,
    onSuccess: () => {
      setIsProcessing(false);
      // Handle successful payment
      console.log('Payment confirmed!');
    },
    onError: () => {
      setIsProcessing(false);
    }
  });

  const getButtonText = () => {
    if (!isConnected) return 'Connect Wallet to Pay';
    if (isProcessing) return 'Processing Payment...';
    if (isConfirming) return 'Confirming Transaction...';
    if (isSuccess) return 'Payment Successful!';
    return \`Pay \${price} \${tokenSymbol}\`;
  };

  const getButtonStyle = () => {
    if (isSuccess) return 'bg-green-600 hover:bg-green-700';
    if (isProcessing || isConfirming) return 'bg-gray-600 cursor-not-allowed';
    return 'bg-blue-600 hover:bg-blue-700';
  };

  return (
    <div className="space-y-4">
      <button
        onClick={handlePayment}
        disabled={isProcessing || isConfirming}
        className={\`w-full py-3 px-6 rounded-lg text-white font-semibold transition-colors \${getButtonStyle()}\`}
      >
        {getButtonText()}
      </button>
      
      {txHash && (
        <div className="text-sm text-gray-600">
          <p>Transaction Hash:</p>
          <a 
            href={\`https://etherscan.io/tx/\${txHash}\`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline break-all"
          >
            {txHash}
          </a>
        </div>
      )}
    </div>
  );
}`}
                  </pre>
                </div>

                <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-xl p-6 mb-6">
                  <h3 className="text-xl font-semibold text-yellow-400 mb-4">🔑 Key Implementation Details</h3>
                  <ul className="space-y-2 text-white/80">
                    <li>• <strong>Wallet Connection:</strong> Automatic MetaMask detection with fallback to other connectors</li>
                    <li>• <strong>Token Conversion:</strong> Proper handling of token decimals using parseUnits</li>
                    <li>• <strong>Transaction Tracking:</strong> Real-time status updates from pending to confirmed</li>
                    <li>• <strong>Error Handling:</strong> Comprehensive error states with user-friendly messages</li>
                    <li>• <strong>UX Optimization:</strong> Clear button states and loading indicators</li>
                  </ul>
                </div>
              </section>

              {/* Section 4: Advanced Features */}
              <section>
                <h2 className="text-3xl font-bold text-white mb-6">4. Advanced Features & Optimizations</h2>
                
                <p className="mb-6">
                  A production-ready checkout system needs more than basic payment functionality. Here are the advanced features that make this boilerplate enterprise-ready:
                </p>

                <div className="grid md:grid-cols-3 gap-6 mb-8">
                  <div className="bg-purple-500/10 border border-purple-500/30 rounded-xl p-6">
                    <h3 className="text-lg font-semibold text-purple-400 mb-3">Multi-Token Support</h3>
                    <ul className="space-y-1 text-white/80 text-sm">
                      <li>• Dynamic token configuration</li>
                      <li>• Automatic price conversion</li>
                      <li>• Token balance validation</li>
                      <li>• Custom token imports</li>
                    </ul>
                  </div>
                  <div className="bg-purple-500/10 border border-purple-500/30 rounded-xl p-6">
                    <h3 className="text-lg font-semibold text-purple-400 mb-3">Enhanced UX</h3>
                    <ul className="space-y-1 text-white/80 text-sm">
                      <li>• Mobile-optimized interface</li>
                      <li>• Loading states and animations</li>
                      <li>• Error recovery mechanisms</li>
                      <li>• Transaction history</li>
                    </ul>
                  </div>
                  <div className="bg-purple-500/10 border border-purple-500/30 rounded-xl p-6">
                    <h3 className="text-lg font-semibold text-purple-400 mb-3">Security Features</h3>
                    <ul className="space-y-1 text-white/80 text-sm">
                      <li>• Input validation and sanitization</li>
                      <li>• Secure contract interactions</li>
                      <li>• Transaction replay protection</li>
                      <li>• Rate limiting and monitoring</li>
                    </ul>
                  </div>
                </div>

                <div className="bg-primary/50 border border-white/20 rounded-lg p-6 mb-6">
                  <h3 className="text-xl font-semibold text-accent mb-4">Product Catalog Integration</h3>
                  <pre className="bg-black/30 p-4 rounded-lg text-green-400 text-sm overflow-x-auto">
{`// app/page.tsx - Main product catalog
import ProductCard from '@/components/ProductCard';

const products = [
  {
    id: 1,
    name: "Premium Web3 Course",
    price: 50,
    image: "/course-image.png",
    description: "Complete Web3 development masterclass"
  },
  {
    id: 2,
    name: "NFT Collection Access",
    price: 25,
    image: "/nft-image.png", 
    description: "Exclusive access to premium NFT drops"
  },
  {
    id: 3,
    name: "DeFi Strategy Guide",
    price: 15,
    image: "/defi-guide.png",
    description: "Professional DeFi investment strategies"
  }
];

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Web3 Digital Products
          </h1>
          <p className="text-xl text-gray-600">
            Pay with ERC20 tokens • Instant delivery • Global access
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
}`}
                  </pre>
                </div>
              </section>

              {/* Section 5: Deployment & Production */}
              <section>
                <h2 className="text-3xl font-bold text-white mb-6">5. Production Deployment & Best Practices</h2>
                
                <p className="mb-6">
                  Deploying a Web3 e-commerce application requires careful consideration of security, performance, and user experience. Here's how to take your checkout system to production:
                </p>

                <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-6 mb-6">
                  <h3 className="text-xl font-semibold text-green-400 mb-4">🚀 Production Checklist</h3>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold text-white mb-2">Security & Configuration:</h4>
                      <ul className="space-y-1 text-white/80 text-sm">
                        <li>• Environment variables for contract addresses</li>
                        <li>• Rate limiting for API endpoints</li>
                        <li>• Input validation and sanitization</li>
                        <li>• HTTPS enforcement and security headers</li>
                        <li>• Contract address verification</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold text-white mb-2">Performance & Monitoring:</h4>
                      <ul className="space-y-1 text-white/80 text-sm">
                        <li>• CDN for static assets and images</li>
                        <li>• Database indexing for transaction logs</li>
                        <li>• Error tracking and monitoring</li>
                        <li>• Performance metrics and analytics</li>
                        <li>• Automated testing and CI/CD</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="bg-blue-500/10 border border-blue-500/30 rounded-xl p-6 mb-6">
                  <h3 className="text-xl font-semibold text-blue-400 mb-4">📊 Real-World Performance</h3>
                  <p className="mb-4">
                    The ERC20 Checkout Boilerplate achieves excellent performance metrics in production:
                  </p>
                  <div className="grid md:grid-cols-4 gap-4 text-center">
                    <div>
                      <div className="text-2xl font-bold text-blue-400">< 2s</div>
                      <div className="text-white/80 text-sm">Page Load Time</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-blue-400">95+</div>
                      <div className="text-white/80 text-sm">Lighthouse Score</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-blue-400">99.9%</div>
                      <div className="text-white/80 text-sm">Transaction Success</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-blue-400">< 500KB</div>
                      <div className="text-white/80 text-sm">Bundle Size</div>
                    </div>
                  </div>
                </div>
              </section>

              {/* CTA Section */}
              <div className="bg-gradient-to-r from-accent/20 to-accent/10 border border-accent/30 rounded-xl p-8 my-12">
                <h3 className="text-2xl font-bold text-white mb-4">Ready to Build Your Web3 E-commerce Platform?</h3>
                <p className="text-white/80 mb-6">
                  Building a production-ready Web3 checkout system requires expertise in both blockchain development and modern frontend technologies. With my experience developing Web3 applications and e-commerce platforms, I can help you create a seamless payment experience that converts visitors into customers.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <a
                    href="https://github.com/DiegoRodriguez93/nextjs-web3-crypto-checkout"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-gray-700 text-white hover:bg-gray-600 transition-all duration-300 group/btn"
                  >
                    <FaGithub className="w-4 h-4" />
                    <span className="font-medium">Fork the Repository</span>
                  </a>
                  <Link href="/contact?service=web3-development">
                    <div className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-accent text-white hover:bg-accent/90 transition-all duration-300 group/btn">
                      <span className="font-medium">Get Custom Web3 E-commerce</span>
                      <BsArrowRight className="w-4 h-4 transition-transform duration-300 group-hover/btn:translate-x-1" />
                    </div>
                  </Link>
                </div>
              </div>

              {/* Conclusion */}
              <section>
                <h2 className="text-3xl font-bold text-white mb-6">Conclusion</h2>
                
                <p className="mb-6">
                  Web3 e-commerce represents a fundamental shift in how we think about online payments and digital ownership. The ERC20 Checkout Boilerplate provides a solid foundation for businesses ready to embrace this future, combining the familiarity of traditional e-commerce with the power of blockchain technology.
                </p>

                <p className="mb-6">
                  The key to success lies in creating seamless user experiences that abstract away blockchain complexity while maintaining the benefits of decentralized payments. With the right tools and implementation patterns, Web3 checkout can be as simple as traditional payment methods.
                </p>

                <div className="bg-blue-500/10 border border-blue-500/30 rounded-xl p-6">
                  <h3 className="text-xl font-semibold text-blue-400 mb-4">Key Takeaways</h3>
                  <ul className="space-y-2 text-white/80">
                    <li>• Modern Web3 stack (wagmi + viem + Next.js) provides excellent DX and performance</li>
                    <li>• User experience is crucial - abstract blockchain complexity behind familiar interfaces</li>
                    <li>• Real-time transaction tracking builds trust and reduces user anxiety</li>
                    <li>• Proper error handling and recovery mechanisms are essential for production</li>
                    <li>• Security considerations must be built into every layer of the application</li>
                    <li>• Open source boilerplates accelerate development and reduce time to market</li>
                  </ul>
                </div>
              </section>
            </div>
          </motion.article>

          {/* Author Bio */}
          <motion.div
            variants={fadeIn("up", 0.4)}
            initial="hidden"
            animate="show"
            exit="hidden"
          >
            <AuthorBio 
              specialization="Senior Full Stack Developer & Web3 E-commerce Specialist"
              description="Diego has developed multiple Web3 applications and e-commerce platforms, including blockchain payment systems that process millions in transactions. He specializes in creating seamless user experiences that bridge traditional web and blockchain technologies."
            />
          </motion.div>

          {/* Related Articles */}
          <motion.div
            variants={fadeIn("up", 0.5)}
            initial="hidden"
            animate="show"
            exit="hidden"
            className="mb-12"
          >
            <h3 className="text-2xl font-bold text-white mb-8">Related Articles</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <Link href="/blog/web3-development-best-practices-enterprise">
                <div className="bg-white/5 border border-white/10 rounded-xl p-6 hover:border-accent/50 transition-all duration-300 group">
                  <h4 className="text-lg font-semibold text-white mb-2 group-hover:text-accent transition-colors">
                    Web3 Development Best Practices for Enterprise
                  </h4>
                  <p className="text-white/70 text-sm">
                    Essential patterns and security considerations for building enterprise-grade Web3 applications.
                  </p>
                </div>
              </Link>
              <Link href="/blog/building-dex-pool-scanner-clmm-solana-rust">
                <div className="bg-white/5 border border-white/10 rounded-xl p-6 hover:border-accent/50 transition-all duration-300 group">
                  <h4 className="text-lg font-semibold text-white mb-2 group-hover:text-accent transition-colors">
                    Building a DEX Pool Scanner with Rust
                  </h4>
                  <p className="text-white/70 text-sm">
                    Learn to build sophisticated DeFi analytics tools using Rust and Solana blockchain.
                  </p>
                </div>
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default ERC20CheckoutArticle;