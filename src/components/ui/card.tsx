import React from "react";

type CardProps = React.HTMLAttributes<HTMLDivElement> & {
  className?: string;
};

export function Card({ className = "", children, ...props }: CardProps) {
  return (
    <div
      className={`rounded-xl border border-gray-800/80 bg-black/40 text-white shadow-sm ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}

type CardContentProps = React.HTMLAttributes<HTMLDivElement> & {
  className?: string;
};

export function CardContent({ className = "", children, ...props }: CardContentProps) {
  return (
    <div className={`p-4 ${className}`} {...props}>
      {children}
    </div>
  );
}


