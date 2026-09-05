import { Link } from "react-router-dom";
import { IconArrowUpRight } from "@tabler/icons-react";
import { motion } from "framer-motion";

const MotionLink = motion.create(Link);

const base =
  "inline-flex items-center justify-center gap-2 rounded-sm px-5 py-3 text-sm font-medium tracking-wide transition-colors duration-300";

const variants = {
  primary: `${base} group bg-accent text-surface hover:bg-[#C5FF99]`,
  secondary: `${base} border border-fg/15 bg-transparent text-fg hover:border-accent hover:text-accent`,
  ghost: `${base} px-0 text-fg-2 hover:text-accent`,
};

export default function Button({
  to,
  href,
  variant = "primary",
  children,
  className = "",
  type = "button",
  onClick,
}) {
  const classes = `${variants[variant]} ${className}`;
  const content = (
    <>
      {children}
      {variant === "primary" ? (
        <IconArrowUpRight
          size={17}
          strokeWidth={1.8}
          className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
          aria-hidden="true"
        />
      ) : null}
    </>
  );
  const motionProps = {
    whileTap: { scale: 0.98 },
    transition: { duration: 0.2 },
  };

  if (to) {
    return (
      <MotionLink to={to} className={classes} {...motionProps}>
        {content}
      </MotionLink>
    );
  }

  if (href) {
    return (
      <motion.a
        href={href}
        className={classes}
        target={href.startsWith("http") ? "_blank" : undefined}
        rel={href.startsWith("http") ? "noreferrer" : undefined}
        {...motionProps}
      >
        {content}
      </motion.a>
    );
  }

  return (
    <motion.button type={type} onClick={onClick} className={classes} {...motionProps}>
      {content}
    </motion.button>
  );
}
