import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent } from './Card';
import { Button } from './Button';
import { ArrowLeft, Clock } from 'lucide-react';

export function PlaceholderPage({ title, description, moduleName, icon: Icon }) {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-2">
        <div>
          <div className="flex items-center gap-2 text-xs text-[#5A6F63] mb-1 font-medium">
            <Link to="/" className="hover:text-[#183B32] transition-colors">Medventory</Link>
            <span>/</span>
            <span className="text-[#183B32]">{title}</span>
          </div>
          <h1 className="text-2xl font-bold text-[#183B32] tracking-tight">{title}</h1>
          <p className="text-sm text-[#5A6F63] mt-1">{description}</p>
        </div>
        <Link to="/">
          <Button variant="outline" size="sm" icon={ArrowLeft}>
            Back to Dashboard
          </Button>
        </Link>
      </div>

      {/* Module Placeholder Card */}
      <Card>
        <CardContent className="py-16 px-6 text-center max-w-lg mx-auto">
          <div className="w-16 h-16 rounded-2xl bg-[#D7FCD4] border border-[#B6CCA1] text-[#183B32] flex items-center justify-center mx-auto mb-5 shadow-sm">
            {Icon ? <Icon className="w-8 h-8" /> : <Clock className="w-8 h-8" />}
          </div>
          <h2 className="text-lg font-bold text-[#183B32]">
            {moduleName || title} Module Under Construction
          </h2>
          <p className="text-sm text-[#5A6F63] mt-2 leading-relaxed">
            This section is part of the planned Medventory architecture. Core data models, business logic, and backend services will be connected in subsequent implementation phases.
          </p>
          <div className="mt-6 inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#F7FAF5] border border-[#E2EBDD] text-xs font-medium text-[#183B32]">
            <span className="w-2 h-2 rounded-full bg-[#B6CCA1]" />
            Status: Initial Setup Baseline
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

