import React from "react";
import Image from "next/image";
import Link from "next/link";
import { BLOG_POSTS } from "@/data/blogs";
import { ArrowRight, Clock, Calendar } from "lucide-react";
import type { Metadata } from "next";
import { HexagonBackground } from "@/components/brand/HexagonBackground";

export const metadata: Metadata = {
  title: "Architectural Journals & Material Science | INTIOSS",
  description:
    "Curated editorial articles on Italian marble specification, humidity considerations in coastal climates, Indian stone density, and curatorial care.",
};

export default function BlogsPage() {
  const featuredPost = BLOG_POSTS[0];
  const regularPosts = BLOG_POSTS.slice(1);

  return (
    <div className="min-h-screen bg-ivory text-maroon pt-24 sm:pt-28 pb-32 relative overflow-hidden">
      {/* Precision Static Half Hexagons in Blank Spaces */}
      <HexagonBackground
        theme="light"
        intensity="subtle"
        showPattern={true}
        showFloating={true}
        density="double"
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-3xl mb-16">
          <span className="font-raleway font-semibold text-xs sm:text-sm uppercase tracking-[0.3em] text-gold-dark mb-3 block">
            Architectural Journals
          </span>
          <h1 className="font-marcellus text-4xl sm:text-6xl text-maroon tracking-wide">
            Essays in Stone, Geology & Architecture
          </h1>
          <p className="font-poppins text-xs sm:text-sm text-stone-700 mt-4 leading-relaxed">
            Written by senior stone consultants and civil engineers from Gandhi Civil Décor and Quality Marble. Technical material science meets spatial aesthetics.
          </p>
        </div>

        {/* Featured Post Hero */}
        <div className="mb-20">
          <Link
            href={`/blogs/${featuredPost.slug}`}
            className="group block bg-white border border-gold/30 shadow-md hover:shadow-2xl transition-all duration-500 overflow-hidden active:scale-[0.99]"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12">
              <div className="lg:col-span-7 relative aspect-[16/10] lg:aspect-auto overflow-hidden bg-stone-100 min-h-[360px]">
                <Image
                  src={featuredPost.coverImage}
                  alt={featuredPost.title}
                  fill
                  priority
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute top-4 left-4 bg-maroon-deep text-ivory text-[10px] font-montserrat uppercase tracking-widest px-3 py-1 border border-gold/40">
                  Featured Essay
                </div>
              </div>

              <div className="lg:col-span-5 p-8 sm:p-12 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-4 text-xs font-raleway uppercase tracking-wider text-gold-dark font-semibold mb-3">
                    <span>{featuredPost.category}</span>
                    <span>·</span>
                    <span className="flex items-center gap-1 text-stone-600">
                      <Clock className="w-3.5 h-3.5" />
                      {featuredPost.readTime}
                    </span>
                  </div>

                  <h2 className="font-marcellus text-2xl sm:text-3xl lg:text-4xl text-maroon group-hover:text-gold-dark transition-colors leading-snug">
                    {featuredPost.title}
                  </h2>

                  <p className="font-garamond italic text-base sm:text-lg text-stone-700 mt-4 leading-relaxed">
                    {featuredPost.excerpt}
                  </p>
                </div>

                <div className="mt-8 pt-6 border-t border-gold/20 flex items-center justify-between">
                  <span className="text-xs font-poppins text-stone-600">
                    {featuredPost.publishDate}
                  </span>
                  <span className="inline-flex items-center gap-1.5 text-xs font-montserrat uppercase tracking-wider text-maroon font-semibold group-hover:translate-x-1 transition-transform">
                    <span>Read Article</span>
                    <ArrowRight className="w-4 h-4 text-gold-dark" />
                  </span>
                </div>
              </div>
            </div>
          </Link>
        </div>

        {/* Regular Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {regularPosts.map((post) => (
            <Link
              key={post.id}
              href={`/blogs/${post.slug}`}
              className="group block bg-white border border-gold/30 shadow-sm hover:shadow-xl transition-all duration-500 overflow-hidden active:scale-[0.99]"
            >
              <div className="relative aspect-[16/10] w-full overflow-hidden bg-stone-100">
                <Image
                  src={post.coverImage}
                  alt={post.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute top-4 left-4 bg-maroon-deep text-ivory text-[9px] font-montserrat uppercase px-2.5 py-0.5 border border-gold/40">
                  {post.category}
                </div>
              </div>

              <div className="p-8">
                <div className="flex items-center gap-3 text-xs font-raleway uppercase tracking-wider text-stone-600 font-medium mb-2">
                  <span>{post.publishDate}</span>
                  <span>·</span>
                  <span>{post.readTime}</span>
                </div>

                <h3 className="font-marcellus text-xl sm:text-2xl text-maroon group-hover:text-gold-dark transition-colors">
                  {post.title}
                </h3>

                <p className="font-poppins text-xs text-stone-700 mt-3 leading-relaxed line-clamp-3">
                  {post.excerpt}
                </p>

                <div className="mt-6 pt-4 border-t border-gold/20 flex items-center gap-1.5 text-xs font-montserrat uppercase tracking-wider text-maroon font-semibold group-hover:translate-x-1 transition-transform">
                  <span>Read Article</span>
                  <ArrowRight className="w-3.5 h-3.5 text-gold-dark" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
