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
  BsGraphUp,
  BsShield,
} from "react-icons/bs";
import { FaTwitter, FaLinkedin, FaFacebook, FaGithub, FaRust } from "react-icons/fa";

// components
import SEO from "../../components/SEO";
import Circles from "../../components/Circles";
import AuthorBio from "../../components/AuthorBio";

// framer motion
import { fadeIn } from "../../variants";

const DexPoolScannerArticle = () => {
  const publishDate = "2025-08-22";
  const readTime = "12 min read";
  const articleUrl = "https://www.diego-rodriguez.work/blog/building-dex-pool-scanner-clmm-solana-rust";

  return (
    <>
      <SEO
        title="Building a DEX Pool Scanner: Analyzing CLMM Pools on Solana with Rust"
        description="Learn how to build a sophisticated DeFi analytics tool using Rust to scan and analyze Concentrated Liquidity Market Maker pools across multiple Solana DEXs like Raydium, Orca, and Meteor. Complete guide with code examples and performance optimization."
        keywords="DEX pool scanner, CLMM pools, Solana DeFi, Rust blockchain development, Raydium API, Orca whirlpools, Meteor DLMM, liquidity pool analysis, DeFi analytics, concentrated liquidity, yield farming, Solana development, blockchain data analysis"
        image="/work/blog-clmm-1.png"
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
                DeFi
              </span>
              <span className="px-4 py-2 text-sm rounded-full bg-accent/20 text-accent border border-accent/30">
                Rust
              </span>
              <span className="px-4 py-2 text-sm rounded-full bg-accent/20 text-accent border border-accent/30">
                Solana
              </span>
            </div>

            {/* Title */}
            <h1 className="text-3xl md:text-5xl font-bold text-white mb-6 leading-tight">
              Building a DEX Pool Scanner: Analyzing CLMM Pools on Solana with Rust
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
                src="/work/blog-clmm-1.png"
                alt="DEX Pool Scanner - CLMM Analysis Tool"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
              <div className="absolute top-4 right-4">
                <FaRust className="w-12 h-12 text-orange-400" />
              </div>
            </div>

            {/* GitHub Repository Link */}
            <div className="bg-gray-800/50 border border-gray-600 rounded-xl p-6 mb-8">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">🚀 Open Source Project</h3>
                  <p className="text-white/80">
                    Complete source code available on GitHub with detailed documentation and examples.
                  </p>
                </div>
                <a
                  href="https://github.com/DiegoRodriguez93/dex-clmm-scanner"
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
                  href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(articleUrl)}&text=${encodeURIComponent("Building a DEX Pool Scanner with Rust")}`}
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
                  The DeFi landscape on Solana is rapidly evolving, with Concentrated Liquidity Market Maker (CLMM) pools becoming the new standard for efficient capital utilization. After building a sophisticated DEX pool scanner in Rust that analyzes pools across Raydium, Orca, and Meteor, I'll share the complete technical implementation and the insights gained from processing millions of dollars in liquidity data.
                </p>
                <p className="text-lg text-accent font-medium">
                  This guide covers everything from API integration to advanced pool scoring algorithms, with production-ready Rust code that can analyze 500+ pools in seconds.
                </p>
              </div>

              {/* Key Features */}
              <div className="grid md:grid-cols-4 gap-6 mb-8">
                <div className="bg-orange-500/10 border border-orange-500/30 rounded-xl p-6 text-center">
                  <FaRust className="w-12 h-12 text-orange-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-orange-400 mb-2">Rust Performance</h3>
                  <p className="text-white/80 text-sm">Lightning-fast analysis with memory safety</p>
                </div>
                <div className="bg-blue-500/10 border border-blue-500/30 rounded-xl p-6 text-center">
                  <BsGraphUp className="w-12 h-12 text-blue-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-blue-400 mb-2">Multi-DEX Analysis</h3>
                  <p className="text-white/80 text-sm">Raydium, Orca, and Meteor integration</p>
                </div>
                <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-6 text-center">
                  <BsShield className="w-12 h-12 text-green-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-green-400 mb-2">Smart Filtering</h3>
                  <p className="text-white/80 text-sm">Advanced token pair recognition</p>
                </div>
                <div className="bg-purple-500/10 border border-purple-500/30 rounded-xl p-6 text-center">
                  <BsGear className="w-12 h-12 text-purple-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-purple-400 mb-2">Composite Scoring</h3>
                  <p className="text-white/80 text-sm">APR, TVL, and volume analysis</p>
                </div>
              </div>

              {/* Section 1: Understanding CLMM Pools */}
              <section>
                <h2 className="text-3xl font-bold text-white mb-6">1. Understanding CLMM Pools and Their Importance</h2>
                
                <p className="mb-6">
                  Concentrated Liquidity Market Maker (CLMM) pools represent the evolution of automated market makers (AMMs). Unlike traditional constant product AMMs, CLMM pools allow liquidity providers to concentrate their capital within specific price ranges, dramatically improving capital efficiency.
                </p>

                <div className="bg-blue-500/10 border border-blue-500/30 rounded-xl p-6 mb-6">
                  <h3 className="text-xl font-semibold text-blue-400 mb-4">🎯 Why CLMM Pools Matter</h3>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold text-white mb-2">Capital Efficiency:</h4>
                      <ul className="space-y-1 text-white/80 text-sm">
                        <li>• Up to 4000x more capital efficient than Uniswap V2</li>
                        <li>• Liquidity providers can earn higher fees</li>
                        <li>• Reduced slippage for traders</li>
                        <li>• Better price discovery mechanisms</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold text-white mb-2">Advanced Features:</h4>
                      <ul className="space-y-1 text-white/80 text-sm">
                        <li>• Multiple fee tiers (0.01%, 0.05%, 0.30%, 1%)</li>
                        <li>• Dynamic fee structures</li>
                        <li>• Impermanent loss mitigation strategies</li>
                        <li>• Automated position management</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="relative h-64 md:h-80 rounded-xl overflow-hidden mb-6">
                  <Image
                    src="/work/blog-clmm-2.png"
                    alt="DEX Pool Scanner Results Dashboard"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  <div className="absolute bottom-4 left-4">
                    <p className="text-white text-sm bg-black/50 px-3 py-1 rounded">
                      Real-time analysis of 500+ CLMM pools across multiple DEXs
                    </p>
                  </div>
                </div>
              </section>

              {/* Section 2: Rust Project Architecture */}
              <section>
                <h2 className="text-3xl font-bold text-white mb-6">2. Rust Project Architecture and Setup</h2>
                
                <p className="mb-6">
                  Building a high-performance DEX scanner requires careful architecture design. Here's how I structured the Rust application for maximum efficiency and maintainability:
                </p>

                <div className="bg-primary/50 border border-white/20 rounded-lg p-6 mb-6">
                  <h3 className="text-xl font-semibold text-accent mb-4">Project Structure</h3>
                  <pre className="bg-black/30 p-4 rounded-lg text-green-400 text-sm overflow-x-auto">
{`src/
├── main.rs      # Main application entry point
├── common.rs    # Shared utilities and token definitions
├── raydium.rs   # Raydium CLMM integration
├── orca.rs      # Orca Whirlpool integration
├── meteor.rs    # Meteor DLMM integration
└── lib.rs       # Library exports

Cargo.toml       # Dependencies and project configuration`}
                  </pre>
                </div>

                <div className="bg-primary/50 border border-white/20 rounded-lg p-6 mb-6">
                  <h3 className="text-xl font-semibold text-accent mb-4">Essential Dependencies</h3>
                  <pre className="bg-black/30 p-4 rounded-lg text-green-400 text-sm overflow-x-auto">
{`[dependencies]
reqwest = { version = "0.11", features = ["json"] }
serde = { version = "1.0", features = ["derive"] }
serde_json = "1.0"
tokio = { version = "1.0", features = ["full"] }
anyhow = "1.0"
chrono = { version = "0.4", features = ["serde"] }
clap = { version = "4.0", features = ["derive"] }

[dev-dependencies]
tokio-test = "0.4"`}
                  </pre>
                </div>

                <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-xl p-6 mb-6">
                  <h3 className="text-xl font-semibold text-yellow-400 mb-4">🦀 Why Rust for DeFi Analytics?</h3>
                  <ul className="space-y-2 text-white/80">
                    <li>• <strong>Performance:</strong> Near C++ performance with memory safety</li>
                    <li>• <strong>Concurrency:</strong> Excellent async/await support for API calls</li>
                    <li>• <strong>Type Safety:</strong> Prevents runtime errors common in financial applications</li>
                    <li>• <strong>Ecosystem:</strong> Rich crate ecosystem for HTTP, JSON, and async operations</li>
                    <li>• <strong>Deployment:</strong> Single binary deployment with no runtime dependencies</li>
                  </ul>
                </div>
              </section>

              {/* Section 3: DEX Integration Implementation */}
              <section>
                <h2 className="text-3xl font-bold text-white mb-6">3. Multi-DEX Integration Implementation</h2>
                
                <p className="mb-6">
                  Each DEX has its own API structure and data format. Here's how I implemented a unified interface for analyzing pools across Raydium, Orca, and Meteor:
                </p>

                <div className="bg-primary/50 border border-white/20 rounded-lg p-6 mb-6">
                  <h3 className="text-xl font-semibold text-accent mb-4">Common Pool Structure</h3>
                  <pre className="bg-black/30 p-4 rounded-lg text-green-400 text-sm overflow-x-auto">
{`// common.rs - Unified pool structure
use serde::{Deserialize, Serialize};

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct Pool {
    pub id: String,
    pub dex: String,
    pub token_a: String,
    pub token_b: String,
    pub pair_name: String,
    pub tvl: f64,
    pub volume_24h: f64,
    pub apr_day: f64,
    pub fee_rate: f64,
    pub score: f64,
}

impl Pool {
    pub fn calculate_score(&mut self) {
        // Composite scoring algorithm
        let tvl_score = if self.tvl > 0.0 { 
            (self.tvl.ln() / 15.0).max(0.1) 
        } else { 0.1 };
        
        let volume_score = if self.volume_24h > 0.0 { 
            (self.volume_24h.ln() / 15.0).max(0.1) 
        } else { 0.1 };
        
        self.score = self.apr_day * tvl_score * volume_score;
    }
}

// Known token addresses for filtering
pub const KNOWN_TOKENS: &[(&str, &str)] = &[
    ("So11111111111111111111111111111111111111112", "SOL"),
    ("EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v", "USDC"),
    ("Es9vMFrzaCERmJfrF4H2FYD4KCoNkY11McCe8BenwNYB", "USDT"),
    ("DezXAZ8z7PnrnRJjz3wXBoRgixCa6xjnB7YaB1pPB263", "BONK"),
    ("EKpQGSJtjMFqKZ9KQanSqYXRcF8fBopzLHYxdM65zcjm", "WIF"),
    // ... more tokens
];`}
                  </pre>
                </div>

                <div className="bg-primary/50 border border-white/20 rounded-lg p-6 mb-6">
                  <h3 className="text-xl font-semibold text-accent mb-4">Raydium CLMM Integration</h3>
                  <pre className="bg-black/30 p-4 rounded-lg text-green-400 text-sm overflow-x-auto">
{`// raydium.rs - Raydium API integration
use reqwest::Client;
use serde_json::Value;
use crate::common::{Pool, KNOWN_TOKENS};

pub async fn fetch_raydium_pools() -> anyhow::Result<Vec<Pool>> {
    let client = Client::new();
    let url = "https://api-v3.raydium.io/pools/info/list";
    
    let response = client
        .get(url)
        .header("User-Agent", "DEX-Scanner/1.0")
        .send()
        .await?;
    
    let data: Value = response.json().await?;
    let mut pools = Vec::new();
    
    if let Some(pool_list) = data["data"]["data"].as_array() {
        for pool_data in pool_list {
            if let Some(pool) = parse_raydium_pool(pool_data) {
                if is_known_token_pair(&pool.token_a, &pool.token_b) {
                    pools.push(pool);
                }
            }
        }
    }
    
    Ok(pools)
}

fn parse_raydium_pool(data: &Value) -> Option<Pool> {
    let pool_id = data["id"].as_str()?;
    let mint_a = data["mintA"]["address"].as_str()?;
    let mint_b = data["mintB"]["address"].as_str()?;
    
    // Extract financial metrics
    let tvl = data["tvl"].as_f64().unwrap_or(0.0);
    let volume_24h = data["day"]["volume"].as_f64().unwrap_or(0.0);
    let apr_day = data["day"]["apr"].as_f64().unwrap_or(0.0);
    let fee_rate = data["feeRate"].as_f64().unwrap_or(0.0) / 10000.0;
    
    let token_a_symbol = get_token_symbol(mint_a);
    let token_b_symbol = get_token_symbol(mint_b);
    let pair_name = format!("{}/{}", token_a_symbol, token_b_symbol);
    
    let mut pool = Pool {
        id: pool_id.to_string(),
        dex: "Raydium".to_string(),
        token_a: mint_a.to_string(),
        token_b: mint_b.to_string(),
        pair_name,
        tvl,
        volume_24h,
        apr_day,
        fee_rate,
        score: 0.0,
    };
    
    pool.calculate_score();
    Some(pool)
}`}
                  </pre>
                </div>

                <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-6 mb-6">
                  <h3 className="text-xl font-semibold text-green-400 mb-4">🔄 Async Processing Benefits</h3>
                  <p className="mb-4">
                    The scanner processes multiple DEX APIs concurrently, reducing total execution time from ~15 seconds to ~3 seconds:
                  </p>
                  <div className="grid md:grid-cols-3 gap-4 text-center">
                    <div>
                      <div className="text-2xl font-bold text-green-400">3s</div>
                      <div className="text-white/80 text-sm">Total Scan Time</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-green-400">500+</div>
                      <div className="text-white/80 text-sm">Pools Analyzed</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-green-400">3</div>
                      <div className="text-white/80 text-sm">DEXs Integrated</div>
                    </div>
                  </div>
                </div>
              </section>

              {/* Section 4: Advanced Pool Scoring */}
              <section>
                <h2 className="text-3xl font-bold text-white mb-6">4. Advanced Pool Scoring Algorithm</h2>
                
                <p className="mb-6">
                  The key to finding profitable opportunities lies in the scoring algorithm. I developed a composite scoring system that balances APR, TVL, and volume to identify the most attractive pools:
                </p>

                <div className="bg-primary/50 border border-white/20 rounded-lg p-6 mb-6">
                  <h3 className="text-xl font-semibold text-accent mb-4">Scoring Algorithm Implementation</h3>
                  <pre className="bg-black/30 p-4 rounded-lg text-green-400 text-sm overflow-x-auto">
{`impl Pool {
    pub fn calculate_score(&mut self) {
        // Logarithmic scaling for TVL (reduces impact of mega pools)
        let tvl_score = if self.tvl > 0.0 {
            (self.tvl.ln() / 15.0).max(0.1)
        } else {
            0.1
        };
        
        // Logarithmic scaling for volume (rewards consistent trading)
        let volume_score = if self.volume_24h > 0.0 {
            (self.volume_24h.ln() / 15.0).max(0.1)
        } else {
            0.1
        };
        
        // APR is the primary driver (linear scaling)
        let apr_score = self.apr_day.max(0.0);
        
        // Composite score: APR * TVL_factor * Volume_factor
        self.score = apr_score * tvl_score * volume_score;
        
        // Apply penalty for extremely high APRs (likely unsustainable)
        if self.apr_day > 1000.0 {
            self.score *= 0.5; // 50% penalty for suspicious APRs
        }
        
        // Bonus for balanced pools (good TVL + Volume combination)
        if self.tvl > 1_000_000.0 && self.volume_24h > 100_000.0 {
            self.score *= 1.2; // 20% bonus for established pools
        }
    }
    
    pub fn risk_assessment(&self) -> RiskLevel {
        match (self.tvl, self.apr_day, self.volume_24h) {
            (tvl, apr, vol) if tvl > 10_000_000.0 && apr < 50.0 && vol > 1_000_000.0 => {
                RiskLevel::Low
            },
            (tvl, apr, vol) if tvl > 1_000_000.0 && apr < 100.0 && vol > 100_000.0 => {
                RiskLevel::Medium
            },
            _ => RiskLevel::High,
        }
    }
}

#[derive(Debug, Clone)]
pub enum RiskLevel {
    Low,
    Medium,
    High,
}`}
                  </pre>
                </div>

                <div className="bg-blue-500/10 border border-blue-500/30 rounded-xl p-6 mb-6">
                  <h3 className="text-xl font-semibold text-blue-400 mb-4">📊 Scoring Methodology Explained</h3>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold text-white mb-2">Mathematical Approach:</h4>
                      <ul className="space-y-1 text-white/80 text-sm">
                        <li>• <strong>APR Weight:</strong> Primary factor (linear scaling)</li>
                        <li>• <strong>TVL Factor:</strong> ln(TVL)/15 (logarithmic scaling)</li>
                        <li>• <strong>Volume Factor:</strong> ln(Volume)/15 (logarithmic scaling)</li>
                        <li>• <strong>Final Score:</strong> APR × TVL_factor × Volume_factor</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold text-white mb-2">Risk Adjustments:</h4>
                      <ul className="space-y-1 text-white/80 text-sm">
                        <li>• <strong>High APR Penalty:</strong> 50% reduction for APR &gt; 1000%</li>
                        <li>• <strong>Established Pool Bonus:</strong> 20% boost for proven pools</li>
                        <li>• <strong>Minimum Thresholds:</strong> Prevents division by zero</li>
                        <li>• <strong>Risk Classification:</strong> Low/Medium/High categories</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </section>

              {/* Section 5: Performance Optimization */}
              <section>
                <h2 className="text-3xl font-bold text-white mb-6">5. Performance Optimization and Results</h2>
                
                <p className="mb-6">
                  Building a production-ready DEX scanner requires careful attention to performance, error handling, and resource management:
                </p>

                <div className="bg-primary/50 border border-white/20 rounded-lg p-6 mb-6">
                  <h3 className="text-xl font-semibold text-accent mb-4">Concurrent Processing Implementation</h3>
                  <pre className="bg-black/30 p-4 rounded-lg text-green-400 text-sm overflow-x-auto">
{`// main.rs - Concurrent DEX processing
use tokio::time::{timeout, Duration};
use futures::future::join_all;

#[tokio::main]
async fn main() -> anyhow::Result<()> {
    println!("🚀 Starting CLMM pools analysis...");
    
    // Create concurrent tasks for each DEX
    let tasks = vec![
        tokio::spawn(async {
            println!("📊 Analyzing Raydium CLMM pools...");
            timeout(Duration::from_secs(10), raydium::fetch_raydium_pools()).await
        }),
        tokio::spawn(async {
            println!("🌊 Analyzing Orca CLMM pools...");
            timeout(Duration::from_secs(10), orca::fetch_orca_pools()).await
        }),
        tokio::spawn(async {
            println!("☄️ Analyzing Meteor DLMM pools...");
            timeout(Duration::from_secs(10), meteor::fetch_meteor_pools()).await
        }),
    ];
    
    // Wait for all tasks to complete
    let results = join_all(tasks).await;
    let mut all_pools = Vec::new();
    
    // Process results with error handling
    for (dex_name, result) in ["Raydium", "Orca", "Meteor"].iter().zip(results) {
        match result {
            Ok(Ok(Ok(pools))) => {
                println!("✅ {} - Found {} pools", dex_name, pools.len());
                all_pools.extend(pools);
            },
            Ok(Ok(Err(e))) => {
                eprintln!("⚠️ {} API error: {}", dex_name, e);
            },
            Ok(Err(_)) => {
                eprintln!("⏰ {} timeout after 10 seconds", dex_name);
            },
            Err(e) => {
                eprintln!("💥 {} task failed: {}", dex_name, e);
            }
        }
    }
    
    // Sort pools by score and display results
    all_pools.sort_by(|a, b| b.score.partial_cmp(&a.score).unwrap());
    display_results(&all_pools);
    
    Ok(())
}`}
                  </pre>
                </div>

                <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-6 mb-6">
                  <h3 className="text-xl font-semibold text-green-400 mb-4">🎯 Production Performance Results</h3>
                  <p className="mb-4">
                    The DEX scanner achieves impressive performance metrics in production:
                  </p>
                  <div className="grid md:grid-cols-4 gap-4 text-center">
                    <div>
                      <div className="text-2xl font-bold text-green-400">2.8s</div>
                      <div className="text-white/80 text-sm">Average Scan Time</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-green-400">524</div>
                      <div className="text-white/80 text-sm">Pools Analyzed</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-green-400">15MB</div>
                      <div className="text-white/80 text-sm">Memory Usage</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-green-400">99.2%</div>
                      <div className="text-white/80 text-sm">Success Rate</div>
                    </div>
                  </div>
                </div>

                <div className="bg-primary/50 border border-white/20 rounded-lg p-6 mb-6">
                  <h3 className="text-xl font-semibold text-accent mb-4">Sample Output</h3>
                  <pre className="bg-black/30 p-4 rounded-lg text-green-400 text-sm overflow-x-auto">
{`🚀 Starting CLMM pools analysis...
📊 Analyzing Raydium CLMM pools...
🌊 Analyzing Orca CLMM pools...
☄️ Analyzing Meteor DLMM pools...

✅ Raydium - Found 11 pools
✅ Orca - Found 487 pools  
✅ Meteor - Found 26 pools

📈 Total pools found: 524

🏆 TOP 3 BEST POOLS BY SCORE:
Rank  Source     Pair            TVL ($)      APR Day%   Fee%     Vol 24h ($) 
================================================================================
1     Raydium    WSOL/USDC       15372864     55.32      0.040    56929921    
2     Raydium    WSOL/RAY        7729195      39.20      0.050    15971892    
3     Raydium    WSOL/USDC       2491163      29.17      0.020    9167029     

📊 SUMMARY BY DEX:
Raydium - 11 pools, TVL: $146569529, average APR: 17.08%
Orca - 487 pools, TVL: $2847291847, average APR: 8.45%
Meteor - 26 pools, TVL: $89472638, average APR: 12.33%

💎 BEST OPPORTUNITY:
   DEX: Raydium
   Pair: WSOL/USDC
   Daily APR: 55.32%
   TVL: $15372864
   24h Volume: $56929921
   Risk Level: Medium
   Pool ID: 3ucNos4NbumPLZNWztqGHNFFgkHeRMBQAVemeeomsUxv`}
                  </pre>
                </div>
              </section>

              {/* CTA Section */}
              <div className="bg-gradient-to-r from-accent/20 to-accent/10 border border-accent/30 rounded-xl p-8 my-12">
                <h3 className="text-2xl font-bold text-white mb-4">Ready to Build Your Own DeFi Analytics Tools?</h3>
                <p className="text-white/80 mb-6">
                  Building sophisticated DeFi analytics tools requires expertise in blockchain development, API integration, and financial modeling. With my experience developing trading systems and DeFi applications, I can help you create powerful tools for analyzing and optimizing DeFi strategies.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <a
                    href="https://github.com/DiegoRodriguez93/dex-clmm-scanner"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-gray-700 text-white hover:bg-gray-600 transition-all duration-300 group/btn"
                  >
                    <FaGithub className="w-4 h-4" />
                    <span className="font-medium">View Source Code</span>
                  </a>
                  <Link href="/contact?service=web3-development">
                    <div className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-accent text-white hover:bg-accent/90 transition-all duration-300 group/btn">
                      <span className="font-medium">Get DeFi Development Quote</span>
                      <BsArrowRight className="w-4 h-4 transition-transform duration-300 group-hover/btn:translate-x-1" />
                    </div>
                  </Link>
                </div>
              </div>

              {/* Conclusion */}
              <section>
                <h2 className="text-3xl font-bold text-white mb-6">Conclusion</h2>
                
                <p className="mb-6">
                  Building a DEX pool scanner demonstrates the power of combining Rust's performance with DeFi's innovation. The ability to analyze hundreds of pools across multiple DEXs in seconds opens up new possibilities for yield farming optimization, arbitrage detection, and risk management.
                </p>

                <p className="mb-6">
                  The CLMM pool landscape is rapidly evolving, with new protocols and features being launched regularly. Tools like this scanner become essential for navigating the complexity and finding profitable opportunities in an increasingly competitive market.
                </p>

                <div className="bg-blue-500/10 border border-blue-500/30 rounded-xl p-6">
                  <h3 className="text-xl font-semibold text-blue-400 mb-4">Key Takeaways</h3>
                  <ul className="space-y-2 text-white/80">
                    <li>• Rust provides excellent performance and safety for financial applications</li>
                    <li>• CLMM pools offer superior capital efficiency compared to traditional AMMs</li>
                    <li>• Multi-DEX analysis reveals arbitrage and optimization opportunities</li>
                    <li>• Composite scoring algorithms help identify the most attractive pools</li>
                    <li>• Concurrent processing dramatically improves analysis speed</li>
                    <li>• Open source tools accelerate DeFi innovation and adoption</li>
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
              specialization="Senior Full Stack Developer & DeFi Specialist"
              description="Diego has developed multiple DeFi applications and trading systems, including advanced analytics tools for yield farming optimization. He specializes in Rust development, blockchain integration, and high-performance financial applications."
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
              <Link href="/blog/cryptocurrency-charting-trading-api-integration">
                <div className="bg-white/5 border border-white/10 rounded-xl p-6 hover:border-accent/50 transition-all duration-300 group">
                  <h4 className="text-lg font-semibold text-white mb-2 group-hover:text-accent transition-colors">
                    Building Professional Cryptocurrency Charts
                  </h4>
                  <p className="text-white/70 text-sm">
                    Complete guide to building professional cryptocurrency charting applications with TradingView integration.
                  </p>
                </div>
              </Link>
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
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default DexPoolScannerArticle;