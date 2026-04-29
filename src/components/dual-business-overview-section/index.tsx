"use client";

import { useMemo, memo } from "react";
import { DUAL_BUSINESS_CONFIG } from "@/lib/config";
import { Container } from "@/components/ui/container";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { QuoteRequest } from "@/components/quote-request";
import { cn } from "@/lib/utils";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

const ease = [0.16, 1, 0.3, 1] as [number, number, number, number];

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease, delay: i * 0.07 },
  }),
};

function DualBusinessOverview() {
  const businesses = useMemo(
    () =>
      DUAL_BUSINESS_CONFIG.businesses.map((b) => ({
        ...b,
        isGreen: b.badge.includes("Polymer") || b.title.includes("Granule"),
      })),
    [],
  );

  return (
    <section id="services" className="relative bg-background border-t border-neutral-200">
      <Container>
        {/* Header — matches about-us style */}
        <motion.div
          className="py-10 lg:py-12 border-b border-neutral-200"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
        >
          <motion.div custom={0} variants={fadeUp} className="flex items-center gap-3 mb-4">
            <Badge
              variant="outline"
              className="px-3 py-1 text-[0.65rem] font-bold uppercase tracking-[0.18em] border-primary-200 text-primary-700 bg-primary-50"
            >
              {DUAL_BUSINESS_CONFIG.badge.text}
            </Badge>
            <span className="h-px w-8 bg-primary-200" aria-hidden />
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-12">
            <motion.h2
              custom={1}
              variants={fadeUp}
              className="text-3xl sm:text-4xl lg:text-[2.5rem] font-bold tracking-tight text-foreground leading-[1.12]"
            >
              {DUAL_BUSINESS_CONFIG.title}
            </motion.h2>
            <motion.p
              custom={2}
              variants={fadeUp}
              className="text-sm text-neutral-600 leading-relaxed self-end"
            >
              {DUAL_BUSINESS_CONFIG.description}
            </motion.p>
          </div>
        </motion.div>

        {/* Division cards — inside container, respects gutter */}
        <div className="py-10 lg:py-12 grid grid-cols-1 lg:grid-cols-2 gap-6 border-b border-neutral-200">
          {businesses.map((b, i) => (
            <motion.div
              key={i}
              className="flex flex-col border border-neutral-200 overflow-hidden"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, ease, delay: i * 0.1 }}
            >
              {/* Image */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <div className="relative overflow-hidden h-44 flex-shrink-0">
                <img
                  src={b.image}
                  alt={b.title}
                  loading="lazy"
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-0 left-0 right-0 px-5 py-2.5 bg-gradient-to-t from-black/45 to-transparent pointer-events-none">
                  <span
                    className={cn(
                      "text-[0.55rem] font-bold uppercase tracking-[0.22em]",
                      b.isGreen ? "text-primary-300" : "text-secondary-300",
                    )}
                  >
                    Division {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-6 flex flex-col flex-1">
                <span
                  className={cn(
                    "text-[0.6rem] font-bold uppercase tracking-[0.18em] mb-2 block",
                    b.isGreen ? "text-primary-600" : "text-secondary-600",
                  )}
                >
                  {b.badge}
                </span>

                <h3 className="text-xl font-bold text-foreground leading-[1.2] mb-3">
                  {b.title}
                </h3>

                <p className="text-sm text-neutral-600 leading-relaxed mb-6">{b.description}</p>

                <ul className="divide-y divide-neutral-100 mb-6">
                  {b.highlights.map((h, j) => (
                    <li key={j} className="flex items-center gap-3 py-2.5">
                      <span
                        className={cn(
                          "text-[0.6rem] font-bold tabular-nums flex-shrink-0",
                          b.isGreen ? "text-primary-400" : "text-secondary-400",
                        )}
                      >
                        {String(j + 1).padStart(2, "0")}
                      </span>
                      <span className="text-sm font-medium text-foreground">{h}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-auto pt-2">
                  <QuoteRequest
                    product={b.isGreen ? "Recycling Services" : "Packaging Solutions"}
                    colorScheme={b.isGreen ? "green" : "blue"}
                  >
                    <Button
                      variant="outline"
                      size="sm"
                      className={cn(
                        "h-9 px-5 font-semibold text-sm border transition-colors",
                        b.isGreen
                          ? "border-primary-300 text-primary-700 hover:bg-primary-50"
                          : "border-secondary-300 text-secondary-700 hover:bg-secondary-50",
                      )}
                    >
                      {b.isGreen ? "Get Quote for Recycling" : "Request CFC Samples"}
                      <ArrowRight className="ml-2 w-3.5 h-3.5" />
                    </Button>
                  </QuoteRequest>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA strip — inside container */}
        <div className="py-8 flex flex-col sm:flex-row items-center justify-between gap-5">
          <div>
            <p className="text-sm font-bold text-foreground mb-1">
              {DUAL_BUSINESS_CONFIG.cta.title}
            </p>
            <p className="text-xs text-neutral-500 leading-relaxed max-w-[55ch]">
              {DUAL_BUSINESS_CONFIG.cta.description}
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 flex-shrink-0">
            {DUAL_BUSINESS_CONFIG.cta.buttons.map((button, i) => (
              <QuoteRequest
                key={i}
                product={
                  button.variant === "green" ? "Recycling Services" : "Packaging Solutions"
                }
                colorScheme={button.variant as "green" | "blue"}
              >
                <Button
                  size="sm"
                  className={cn(
                    "h-9 px-5 font-semibold text-sm",
                    button.variant === "green"
                      ? "bg-primary-600 hover:bg-primary-700 text-white"
                      : "bg-neutral-900 hover:bg-neutral-800 text-white",
                  )}
                >
                  {button.text}
                  <ArrowRight className="w-3.5 h-3.5 ml-2" />
                </Button>
              </QuoteRequest>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}

export default memo(DualBusinessOverview);
