import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const ServiceCard = ({ icon: Icon, title, description, benefits }) => {
  return (
    <Card className="h-full flex flex-col hover:shadow-lg transition-all duration-300">
      <CardHeader>
        <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center mb-4">
          <Icon className="w-6 h-6 text-accent" />
        </div>
        <CardTitle className="text-2xl">{title}</CardTitle>
        <CardDescription className="text-base leading-relaxed">{description}</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col">
        <ul className="space-y-2 mt-auto">
          {benefits.map((benefit, index) => (
            <li key={index} className="flex items-start gap-2 text-sm">
              <span className="text-accent mt-1">✓</span>
              <span>{benefit}</span>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
};

export default ServiceCard;