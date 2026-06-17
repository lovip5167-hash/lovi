import React from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

const FAQItem = ({ question, answer, value }) => {
  return (
    <AccordionItem value={value}>
      <AccordionTrigger className="text-left text-lg font-medium">
        {question}
      </AccordionTrigger>
      <AccordionContent className="text-muted-foreground leading-relaxed">
        {answer}
      </AccordionContent>
    </AccordionItem>
  );
};

export default FAQItem;