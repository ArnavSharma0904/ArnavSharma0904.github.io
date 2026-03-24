"use client";

import { motion } from "framer-motion";
import { AnimatedFolder } from "@/components/ui/3d-folder";
import { projects } from "@/data/site";

const MISC_IMAGES = [
  {
    id: "misc-1",
    image:
      "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=800",
    title: "Late night code",
  },
  {
    id: "misc-2",
    image:
      "https://images.unsplash.com/photo-1558655146-d09347e92766?auto=format&fit=crop&q=80&w=800",
    title: "Design explorations",
  },
  {
    id: "misc-3",
    image:
      "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=800",
    title: "Data & systems",
  },
];

const EXCLUDED = ["Decademy", "Illinois FLL"];

export function Gallery() {
  const folders = projects
    .filter((p) => !EXCLUDED.includes(p.title))
    .map((p) => ({
      title: p.title,
      gradient: p.gradient,
      images: p.images.map((img, i) => ({
        id: `${p.title}-${i}`,
        image: img,
        title: `${p.title} — ${i + 1}`,
      })),
    }));

  return (
    <section id="gallery" className="relative py-32 px-6">
      <div className="max-w-[1200px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-20"
        >
          <p className="text-[11px] font-mono uppercase tracking-[0.3em] text-accent mb-4">
            Visual portfolio
          </p>
          <h2 className="text-5xl md:text-7xl font-bold tracking-tight text-foreground">
            Gallery
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 justify-items-center">
          {folders.map((folder, i) => (
            <motion.div
              key={folder.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="w-full"
            >
              <AnimatedFolder
                title={folder.title}
                projects={folder.images}
                gradient={folder.gradient}
                className="w-full"
              />
            </motion.div>
          ))}

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: folders.length * 0.1, duration: 0.5 }}
            className="w-full"
          >
            <AnimatedFolder
              title="Misc"
              projects={MISC_IMAGES}
              gradient="linear-gradient(135deg, #6b7280, #374151)"
              className="w-full"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
