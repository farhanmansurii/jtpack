"use client";

import { useMemo, memo } from "react";
import {
  Leaf,
  Package,
  Recycle,
  Factory,
  Boxes,
  FlaskConical,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
} from "lucide-react";
import { motion } from "framer-motion";
import { Container } from "@/components/ui/container";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ABOUT_US_CONFIG } from "@/lib/config";
import Link from "next/link";
import { ProductImageCarousel } from "./product-image-carousel";

const ICON_MAP: Record<string, React.ElementType> = {
  Leaf,
  Package,
  Recycle,
  Factory,
  Boxes,
  FlaskConical,
  CheckCircle2,
};

const ease = [0.16, 1, 0.3, 1] as [number, number, number, number];

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease, delay: i * 0.08 },
  }),
};

function AboutUsSection() {
  const { badge, title, description, features, values } = ABOUT_US_CONFIG;

  const mappedFeatures = useMemo(
    () => features.map((f) => ({ ...f, Icon: ICON_MAP[f.icon] || CheckCircle2 })),
    [features],
  );

  return (
    <section id="about" className="relative bg-background border-t border-neutral-200 overflow-hidden">
      <Container className="relative z-10 py-0">
        <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[600px]">

          {/* ── Left: Content ── */}
          <motion.div
            className="lg:col-span-6 py-14 lg:py-16 flex flex-col justify-between order-2 lg:order-1 lg:border-r lg:border-neutral-200 lg:pr-12"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
          >
            <div>
              <motion.div custom={0} variants={fadeUp} className="mb-4 flex items-center gap-3">
                <Badge
                  variant="outline"
                  className="px-3 py-1 text-[0.65rem] font-bold uppercase tracking-[0.18em] border-primary-200 text-primary-700 bg-primary-50"
                >
                  {badge.text}
                </Badge>
                <span className="h-px w-8 bg-primary-200" aria-hidden />
              </motion.div>

              <motion.h2
                custom={1}
                variants={fadeUp}
                className="text-3xl sm:text-4xl lg:text-[2.5rem] font-bold tracking-tight text-foreground mb-4 leading-[1.12]"
              >
                {title}
              </motion.h2>

              <motion.p
                custom={2}
                variants={fadeUp}
                className="text-sm text-neutral-600 leading-relaxed mb-7 max-w-[58ch]"
              >
                {description.first}
              </motion.p>

              {/* Feature list — tight ruled rows */}
              <motion.ul custom={3} variants={fadeUp} className="divide-y divide-neutral-100 mb-8">
                {mappedFeatures.map(({ label, Icon }, idx) => (
                  <li key={idx} className="flex items-center gap-3 py-2.5">
                    <Icon className="w-4 h-4 text-primary-600 flex-shrink-0" />
                    <span className="text-sm font-medium text-foreground">{label}</span>
                  </li>
                ))}
              </motion.ul>
            </div>

            {/* CTA row */}
            <motion.div custom={4} variants={fadeUp} className="flex items-center gap-5 flex-wrap">
              <Button asChild size="lg" className="h-10 px-6 font-semibold shadow-sm">
                <Link href="/about">
                  Company Profile <ArrowRight className="ml-2 w-4 h-4" />
                </Link>
              </Button>
              <div className="flex items-center gap-2 text-sm font-medium text-neutral-500">
                <ShieldCheck className="w-4 h-4 text-primary-600" />
                ISO-compliant quality checks
              </div>
            </motion.div>
          </motion.div>

          {/* ── Right: Image (full column height) ── */}
          <motion.div
            className="lg:col-span-6 order-1 lg:order-2 overflow-hidden border-b lg:border-b-0 border-neutral-200"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="h-full min-h-[300px] lg:min-h-full">
              <ProductImageCarousel fillHeight />
            </div>
          </motion.div>
        </div>

        {/* ── Values strip ── */}
        <motion.div
          className="border-t border-neutral-200 py-7"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <div className="grid grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-neutral-200">
            {values.map(({ stat, label }, idx) => (
              <div key={idx} className="sm:px-10 first:pl-0 last:pr-0 py-4 sm:py-0">
                <p className="text-base font-bold text-foreground tracking-tight mb-0.5">{stat}</p>
                <p className="text-xs text-neutral-500 leading-snug max-w-[20ch]">{label}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </Container>
    </section>
  );
}

export default memo(AboutUsSection);
