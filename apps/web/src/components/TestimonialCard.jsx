import React from 'react';

const TestimonialCard = ({ quote, name, role }) => {
  return (
    <div className="bg-card rounded-2xl p-6 shadow-md break-inside-avoid mb-6">
      <div className="text-accent text-4xl font-serif mb-4">"</div>
      <p className="text-card-foreground leading-relaxed mb-4">{quote}</p>
      <div className="border-t border-border pt-4">
        <p className="font-semibold text-card-foreground">{name}</p>
        <p className="text-sm text-muted-foreground">{role}</p>
      </div>
    </div>
  );
};

export default TestimonialCard;