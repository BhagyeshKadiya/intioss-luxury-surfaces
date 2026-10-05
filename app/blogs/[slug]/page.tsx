import React from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BLOG_POSTS } from "@/data/blogs";
import { ArrowLeft, Clock, Calendar, User, Share2 } from "lucide-react";
import type { Metadata } from "next";

export async function generateStaticParams() {
  return BLOG_POSTS.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const post = BLOG_POSTS.find((p) => p.slug === params.slug);
  if (!post) return {};

  return {
    title: `${post.title} | INTIOSS Journals`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: [{ url: post.coverImage }],
    },
  };
}

export default function BlogPostDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const post = BLOG_POSTS.find((p) => p.slug === params.slug);
  if (!post) notFound();

  return (
    <article className="min-h-screen bg-ivory text-maroon pt-24 sm:pt-28 pb-32">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Link */}
        <Link
          href="/blogs"
          className="inline-flex items-center gap-2 text-xs font-raleway uppercase tracking-[0.25em] text-grey hover:text-maroon transition-colors mb-8"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Essays</span>
        </Link>

        {/* Category & Title */}
        <div className="mb-8">
          <div className="flex items-center gap-3 text-xs font-raleway uppercase tracking-wider text-gold mb-3">
            <span>{post.category}</span>
            <span>·</span>
            <span>{post.readTime}</span>
          </div>

          <h1 className="font-marcellus text-3xl sm:text-5xl text-maroon leading-tight">
            {post.title}
          </h1>

          <div className="flex items-center gap-6 mt-6 pb-6 border-b border-gold/30 text-xs font-poppins text-grey">
            <span className="flex items-center gap-1.5">
              <User className="w-3.5 h-3.5 text-gold" />
              {post.author}
            </span>
            <span className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-gold" />
              {post.publishDate}
            </span>
          </div>
        </div>

        {/* Lead Excerpt in EB Garamond */}
        <p className="font-garamond italic text-xl sm:text-2xl text-maroon/90 leading-relaxed mb-10 pb-8 border-b border-gold/20">
          {post.excerpt}
        </p>

        {/* Cover Image */}
        <div className="relative aspect-[16/9] w-full overflow-hidden border border-gold/40 shadow-xl mb-12 bg-stone-100">
          <Image
            src={post.coverImage}
            alt={post.title}
            fill
            priority
            className="object-cover"
          />
        </div>

        {/* Article Body */}
        <div
          className="prose prose-stone max-w-none font-poppins text-sm sm:text-base text-maroon/85 leading-relaxed space-y-6 [&>h3]:font-marcellus [&>h3]:text-2xl [&>h3]:text-maroon [&>h3]:pt-6 [&>h3]:border-t [&>h3]:border-gold/20 [&>p]:leading-relaxed"
          dangerouslySetInnerHTML={{ __html: post.contentHtml }}
        />

        {/* Author Bio Box */}
        <div className="mt-16 p-8 bg-white border border-gold/30 flex flex-col sm:flex-row items-center sm:items-start gap-6 shadow-sm">
          <div className="w-16 h-16 rounded-full border border-gold flex items-center justify-center bg-maroon text-gold font-marcellus text-2xl flex-shrink-0">
            I
          </div>
          <div>
            <h4 className="font-marcellus text-lg text-maroon">
              INTIOSS Architectural Advisory
            </h4>
            <p className="font-poppins text-xs text-grey mt-1 leading-relaxed">
              Curated by the engineering and material sourcing teams of Gandhi Civil Decor Group and Quality Marble. For consultations regarding slab testing and humidity engineering, speak with our private concierge.
            </p>
            <div className="mt-4">
              <Link
                href="/#consultation"
                className="text-xs font-montserrat uppercase tracking-wider text-maroon hover:text-gold underline font-semibold"
              >
                Schedule an Architectural Briefing →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
