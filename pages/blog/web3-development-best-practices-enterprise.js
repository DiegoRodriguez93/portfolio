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
  BsShield,
  BsGear,
  BsLightning,
} from "react-icons/bs";
import { FaTwitter, FaLinkedin, FaFacebook } from "react-icons/fa";

// components
import SEO from "../../components/SEO";
import Circles from "../../components/Circles";
import AuthorBio from "../../components/AuthorBio";

// framer motion
import { fadeIn } from "../../variants";

import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useRouter } from "next/router";

const Web3DevelopmentArticle = () => {
  const { t } = useTranslation(["blog", "common"]);
  const { locale } = useRouter();
  const dateLocale = locale === "es" ? "es-ES" : "en-US";

  const publishDate = "2025-01-10";
  const readTime = "8 min read";
  const articleUrl = "https://www.diego-rodriguez.work/blog/web3-development-best-practices-enterprise";

  return (
    <>
      <SEO
        title="Web3 Development Best Practices for Enterprise Applications 2025"
        description="Essential patterns, security considerations, and architecture guidelines for building enterprise-grade Web3 applications. Learn from real-world implementations and avoid common pitfalls in blockchain development."
        keywords="web3 development, enterprise blockchain, smart contracts, DeFi development, blockchain architecture, web3 security, ethereum development, solidity best practices, decentralized applications, enterprise web3, blockchain integration"
        image="/og-web3-enterprise.jpg"
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
              <span>{t("blog:backToBlog")}</span>
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
                Blockchain
              </span>
              <span className="px-4 py-2 text-sm rounded-full bg-accent/20 text-accent border border-accent/30">
                Enterprise
              </span>
            </div>

            {/* Title */}
            <h1 className="text-3xl md:text-5xl font-bold text-white mb-6 leading-tight">
              Web3 Development Best Practices for Enterprise Applications
            </h1>

            {/* Meta Info */}
            <div className="flex flex-wrap items-center gap-6 text-white/60 mb-8">
              <div className="flex items-center gap-2">
                <BsCalendar className="w-4 h-4" />
                <span>
                  {new Date(publishDate).toLocaleDateString(dateLocale, {
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
                <span>{t("blog:by")}</span>
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
                src="/thumb2.jpg"
                alt="Web3 Enterprise Development"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
            </div>

            {/* Share Buttons */}
            <div className="flex items-center gap-4">
              <span className="text-white/60 text-sm">{t("blog:share")}</span>
              <div className="flex gap-3">
                <a
                  href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(articleUrl)}&text=${encodeURIComponent("Web3 Development Best Practices for Enterprise")}`}
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
                  Enterprise Web3 development requires a fundamentally different approach than traditional blockchain projects. After building Web3 solutions for Fortune 500 companies and managing multi-million dollar DeFi protocols, I&apos;ve learned that success depends on robust architecture, security-first design, and seamless integration with existing enterprise systems.
                </p>
                <p className="text-lg text-accent font-medium">
                  This guide shares battle-tested patterns and practices that ensure your Web3 applications meet enterprise standards for security, scalability, and compliance.
                </p>
              </div>

              {/* Key Principles */}
              <div className="grid md:grid-cols-3 gap-6 mb-8">
                <div className="bg-blue-500/10 border border-blue-500/30 rounded-xl p-6 text-center">
                  <BsShield className="w-12 h-12 text-blue-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-blue-400 mb-2">Security First</h3>
                  <p className="text-white/80 text-sm">Multi-layered security with formal verification and comprehensive auditing</p>
                </div>
                <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-6 text-center">
                  <BsLightning className="w-12 h-12 text-green-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-green-400 mb-2">Performance</h3>
                  <p className="text-white/80 text-sm">Optimized gas usage and efficient state management for cost-effective operations</p>
                </div>
                <div className="bg-purple-500/10 border border-purple-500/30 rounded-xl p-6 text-center">
                  <BsGear className="w-12 h-12 text-purple-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-purple-400 mb-2">Integration</h3>
                  <p className="text-white/80 text-sm">Seamless connection with existing enterprise infrastructure and workflows</p>
                </div>
              </div>

              {/* Section 1: Architecture Patterns */}
              <section>
                <h2 className="text-3xl font-bold text-white mb-6">1. Enterprise-Grade Architecture Patterns</h2>
                
                <p className="mb-6">
                  Enterprise Web3 applications require careful architectural planning to ensure scalability, maintainability, and security. Here are the proven patterns I use for large-scale deployments:
                </p>

                <div className="bg-primary/50 border border-white/20 rounded-lg p-6 mb-6">
                  <h3 className="text-xl font-semibold text-accent mb-4">Layered Architecture Example</h3>
                  <pre className="bg-black/30 p-4 rounded-lg text-green-400 text-sm overflow-x-auto">
{`// Smart Contract Layer (Solidity)
contract EnterpriseToken {
    using SafeMath for uint256;
    
    mapping(address => uint256) private _balances;
    mapping(address => bool) private _authorized;
    
    modifier onlyAuthorized() {
        require(_authorized[msg.sender], "Unauthorized");
        _;
    }
    
    function transfer(address to, uint256 amount) 
        external onlyAuthorized returns (bool) {
        // Implementation with enterprise controls
    }
}

// Service Layer (Node.js)
class BlockchainService {
    async executeTransaction(params) {
        // Validation, logging, monitoring
        const result = await this.contract.methods
            .transfer(params.to, params.amount)
            .send({ from: params.from });
        
        await this.auditLogger.log(result);
        return result;
    }
}`}
                  </pre>
                </div>

                <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-xl p-6 mb-6">
                  <h3 className="text-xl font-semibold text-yellow-400 mb-4">🏗️ Architecture Best Practices</h3>
                  <ul className="space-y-2 text-white/80">
                    <li>• <strong>Separation of Concerns:</strong> Keep business logic separate from blockchain interactions</li>
                    <li>• <strong>Event-Driven Design:</strong> Use blockchain events for state synchronization</li>
                    <li>• <strong>Proxy Patterns:</strong> Implement upgradeable contracts for long-term maintenance</li>
                    <li>• <strong>Circuit Breakers:</strong> Add fail-safes for emergency situations</li>
                  </ul>
                </div>
              </section>

              {/* Section 2: Security Framework */}
              <section>
                <h2 className="text-3xl font-bold text-white mb-6">2. Comprehensive Security Framework</h2>
                
                <p className="mb-6">
                  Security in enterprise Web3 applications goes beyond smart contract audits. You need a holistic approach that covers every layer of your application:
                </p>

                <div className="grid md:grid-cols-2 gap-6 mb-8">
                  <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-6">
                    <h3 className="text-xl font-semibold text-red-400 mb-4">Smart Contract Security</h3>
                    <ul className="space-y-2 text-white/80 text-sm">
                      <li>• Reentrancy protection with ReentrancyGuard</li>
                      <li>• Integer overflow protection (SafeMath)</li>
                      <li>• Access control with role-based permissions</li>
                      <li>• Formal verification for critical functions</li>
                      <li>• Multi-signature requirements for admin functions</li>
                    </ul>
                  </div>
                  <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-6">
                    <h3 className="text-xl font-semibold text-red-400 mb-4">Application Security</h3>
                    <ul className="space-y-2 text-white/80 text-sm">
                      <li>• Private key management with HSMs</li>
                      <li>• API rate limiting and DDoS protection</li>
                      <li>• Input validation and sanitization</li>
                      <li>• Secure communication (TLS 1.3)</li>
                      <li>• Comprehensive audit logging</li>
                    </ul>
                  </div>
                </div>

                <div className="bg-primary/50 border border-white/20 rounded-lg p-6 mb-6">
                  <h3 className="text-xl font-semibold text-accent mb-4">Security Checklist Implementation</h3>
                  <pre className="bg-black/30 p-4 rounded-lg text-green-400 text-sm overflow-x-auto">
{`// Security middleware example
const securityMiddleware = {
    // Rate limiting
    rateLimit: rateLimit({
        windowMs: 15 * 60 * 1000, // 15 minutes
        max: 100 // limit each IP to 100 requests per windowMs
    }),
    
    // Input validation
    validateInput: (schema) => (req, res, next) => {
        const { error } = schema.validate(req.body);
        if (error) return res.status(400).json({ error: error.details[0].message });
        next();
    },
    
    // Authentication
    authenticate: async (req, res, next) => {
        const token = req.headers.authorization?.split(' ')[1];
        if (!token) return res.status(401).json({ error: 'No token provided' });
        
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = decoded;
            next();
        } catch (error) {
            return res.status(401).json({ error: 'Invalid token' });
        }
    }
};`}
                  </pre>
                </div>
              </section>

              {/* Section 3: Integration Patterns */}
              <section>
                <h2 className="text-3xl font-bold text-white mb-6">3. Enterprise Integration Patterns</h2>
                
                <p className="mb-6">
                  Successful enterprise Web3 applications must integrate seamlessly with existing systems. Here&apos;s how I approach complex integrations:
                </p>

                <div className="bg-blue-500/10 border border-blue-500/30 rounded-xl p-6 mb-6">
                  <h3 className="text-xl font-semibold text-blue-400 mb-4">🔗 Integration Strategy</h3>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold text-white mb-2">API Gateway Pattern</h4>
                      <p className="text-white/80 text-sm mb-4">
                        Centralized entry point for all blockchain interactions, providing authentication, rate limiting, and monitoring.
                      </p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-white mb-2">Event Sourcing</h4>
                      <p className="text-white/80 text-sm mb-4">
                        Capture all blockchain events and replay them to maintain consistent state across systems.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-primary/50 border border-white/20 rounded-lg p-6 mb-6">
                  <h3 className="text-xl font-semibold text-accent mb-4">Enterprise Integration Example</h3>
                  <pre className="bg-black/30 p-4 rounded-lg text-green-400 text-sm overflow-x-auto">
{`// Enterprise API Gateway
class Web3Gateway {
    constructor() {
        this.web3 = new Web3(process.env.ETHEREUM_RPC_URL);
        this.contract = new this.web3.eth.Contract(ABI, CONTRACT_ADDRESS);
        this.eventProcessor = new EventProcessor();
    }
    
    async processTransaction(request) {
        // 1. Validate against enterprise policies
        await this.validateBusinessRules(request);
        
        // 2. Execute blockchain transaction
        const txHash = await this.executeTransaction(request);
        
        // 3. Update enterprise systems
        await this.updateERP(request, txHash);
        
        // 4. Send notifications
        await this.notificationService.send(request.userId, {
            type: 'TRANSACTION_COMPLETE',
            txHash: txHash
        });
        
        return { success: true, txHash };
    }
    
    async validateBusinessRules(request) {
        // Integration with existing compliance systems
        const complianceCheck = await this.complianceAPI.validate(request);
        if (!complianceCheck.approved) {
            throw new Error('Transaction violates compliance rules');
        }
    }
}`}
                  </pre>
                </div>
              </section>

              {/* Section 4: Performance Optimization */}
              <section>
                <h2 className="text-3xl font-bold text-white mb-6">4. Performance & Cost Optimization</h2>
                
                <p className="mb-6">
                  Enterprise applications must be cost-effective and performant. Here are the optimization strategies that have saved my clients millions in gas fees:
                </p>

                <div className="grid md:grid-cols-3 gap-6 mb-8">
                  <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-6">
                    <h3 className="text-lg font-semibold text-green-400 mb-3">Gas Optimization</h3>
                    <ul className="space-y-1 text-white/80 text-sm">
                      <li>• Batch operations</li>
                      <li>• Efficient data structures</li>
                      <li>• Assembly optimizations</li>
                      <li>• Storage slot packing</li>
                    </ul>
                  </div>
                  <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-6">
                    <h3 className="text-lg font-semibold text-green-400 mb-3">Caching Strategy</h3>
                    <ul className="space-y-1 text-white/80 text-sm">
                      <li>• Redis for hot data</li>
                      <li>• IPFS for large files</li>
                      <li>• CDN for static assets</li>
                      <li>• Database indexing</li>
                    </ul>
                  </div>
                  <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-6">
                    <h3 className="text-lg font-semibold text-green-400 mb-3">Scaling Solutions</h3>
                    <ul className="space-y-1 text-white/80 text-sm">
                      <li>• Layer 2 integration</li>
                      <li>• State channels</li>
                      <li>• Sidechains</li>
                      <li>• Rollup strategies</li>
                    </ul>
                  </div>
                </div>

                <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-6 mb-6">
                  <h3 className="text-xl font-semibold text-green-400 mb-4">💰 Real Cost Savings</h3>
                  <p className="mb-4">
                    By implementing these optimization strategies for a DeFi protocol, we reduced gas costs by 67% and improved transaction throughput by 340%. The annual savings exceeded $2.3M in gas fees alone.
                  </p>
                  <div className="grid md:grid-cols-3 gap-4 text-center">
                    <div>
                      <div className="text-2xl font-bold text-green-400">67%</div>
                      <div className="text-white/80 text-sm">Gas Cost Reduction</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-green-400">340%</div>
                      <div className="text-white/80 text-sm">Throughput Increase</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-green-400">$2.3M</div>
                      <div className="text-white/80 text-sm">Annual Savings</div>
                    </div>
                  </div>
                </div>
              </section>

              {/* Section 5: Compliance & Governance */}
              <section>
                <h2 className="text-3xl font-bold text-white mb-6">5. Compliance & Governance Framework</h2>
                
                <p className="mb-6">
                  Enterprise Web3 applications must meet strict regulatory requirements. Here&apos;s how to build compliance into your architecture from day one:
                </p>

                <div className="bg-purple-500/10 border border-purple-500/30 rounded-xl p-6 mb-6">
                  <h3 className="text-xl font-semibold text-purple-400 mb-4">📋 Compliance Checklist</h3>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold text-white mb-2">Data Protection</h4>
                      <ul className="space-y-1 text-white/80 text-sm">
                        <li>• GDPR compliance for EU users</li>
                        <li>• Data encryption at rest and in transit</li>
                        <li>• Right to be forgotten implementation</li>
                        <li>• Privacy-preserving technologies</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold text-white mb-2">Financial Regulations</h4>
                      <ul className="space-y-1 text-white/80 text-sm">
                        <li>• KYC/AML integration</li>
                        <li>• Transaction monitoring</li>
                        <li>• Regulatory reporting</li>
                        <li>• Audit trail maintenance</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </section>

              {/* CTA Section */}
              <div className="bg-gradient-to-r from-accent/20 to-accent/10 border border-accent/30 rounded-xl p-8 my-12">
                <h3 className="text-2xl font-bold text-white mb-4">Ready to Build Enterprise-Grade Web3 Applications?</h3>
                <p className="text-white/80 mb-6">
                  Building enterprise Web3 applications requires deep expertise in blockchain technology, security, and enterprise architecture. With 9+ years of experience and a track record of successful deployments, I can help you navigate the complexities and deliver a solution that meets your business requirements.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link href="/contact?service=web3-development">
                    <div className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-accent text-white hover:bg-accent/90 transition-all duration-300 group/btn">
                      <span className="font-medium">Get Web3 Development Quote</span>
                      <BsArrowRight className="w-4 h-4 transition-transform duration-300 group-hover/btn:translate-x-1" />
                    </div>
                  </Link>
                  <Link href="/contact">
                    <div className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border border-accent text-accent hover:bg-accent hover:text-white transition-all duration-300">
                      <span className="font-medium">Schedule Consultation</span>
                    </div>
                  </Link>
                </div>
              </div>

              {/* Conclusion */}
              <section>
                <h2 className="text-3xl font-bold text-white mb-6">Conclusion</h2>
                
                <p className="mb-6">
                  Enterprise Web3 development is fundamentally different from typical blockchain projects. Success requires a deep understanding of both blockchain technology and enterprise requirements. The patterns and practices outlined in this guide have been proven in production environments managing billions in value.
                </p>

                <p className="mb-6">
                  Remember that Web3 is still an emerging technology. Stay updated with the latest developments, maintain security as your top priority, and always plan for scalability from the beginning. The enterprises that adopt Web3 thoughtfully today will have significant competitive advantages tomorrow.
                </p>

                <div className="bg-blue-500/10 border border-blue-500/30 rounded-xl p-6">
                  <h3 className="text-xl font-semibold text-blue-400 mb-4">Key Takeaways</h3>
                  <ul className="space-y-2 text-white/80">
                    <li>• Security must be built into every layer of your application</li>
                    <li>• Performance optimization can save millions in operational costs</li>
                    <li>• Compliance requirements must be considered from day one</li>
                    <li>• Integration with existing systems is crucial for adoption</li>
                    <li>• Choose the right blockchain and scaling solutions for your use case</li>
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
              specialization="Senior Full Stack Developer & Web3 Specialist"
              description="Diego has architected and deployed Web3 solutions for Fortune 500 companies, managing over $50M in smart contract value. He specializes in enterprise blockchain integration, DeFi protocols, and secure smart contract development."
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
              <Link href="/blog/how-to-build-profitable-trading-bots-2025">
                <div className="bg-white/5 border border-white/10 rounded-xl p-6 hover:border-accent/50 transition-all duration-300 group">
                  <h4 className="text-lg font-semibold text-white mb-2 group-hover:text-accent transition-colors">
                    How to Build Profitable Trading Bots in 2025
                  </h4>
                  <p className="text-white/70 text-sm">
                    Complete guide to developing algorithmic trading systems using Python and machine learning.
                  </p>
                </div>
              </Link>
              <Link href="/blog/fintech-api-development-security-scalability">
                <div className="bg-white/5 border border-white/10 rounded-xl p-6 hover:border-accent/50 transition-all duration-300 group">
                  <h4 className="text-lg font-semibold text-white mb-2 group-hover:text-accent transition-colors">
                    Fintech API Development: Security and Scalability
                  </h4>
                  <p className="text-white/70 text-sm">
                    Building secure and scalable financial APIs with proper authentication and compliance standards.
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

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common", "blog"])),
    },
  };
}

export default Web3DevelopmentArticle;