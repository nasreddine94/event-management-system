import React, { useState, useRef, useEffect } from 'react';
import { useFeatureStatus, FeatureStatus } from '../contexts/FeatureStatusContext';
import { cn } from '../lib/utils';

interface FeatureStatusIndicatorProps {
    key?: React.Key;
    featureId: string;
    children: React.ReactNode;
    className?: string;
}

const STATUS_COLORS: Record<FeatureStatus, string> = {
    'future': 'bg-red-500',
    'next-phase': 'bg-orange-500',
    'built': 'bg-emerald-500',
    'eliminated': 'bg-purple-500'
};

const STATUS_BG_COLORS: Record<FeatureStatus, string> = {
    'future': 'bg-red-50 hover:bg-red-100/50',
    'next-phase': 'bg-orange-50 hover:bg-orange-100/50',
    'built': 'hover:bg-emerald-50/50', // Very subtle or transparent for built
    'eliminated': 'bg-purple-50 hover:bg-purple-100/50'
};

const STATUS_LABELS: Record<FeatureStatus, string> = {
    'future': 'Future',
    'next-phase': 'Next Phase',
    'built': 'Built',
    'eliminated': 'Eliminated'
};

export default function FeatureStatusIndicator({ featureId, children, className }: FeatureStatusIndicatorProps) {
    const { getStatus, setStatus } = useFeatureStatus();
    const status = getStatus(featureId);
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <div className={cn("relative group/feature transition-colors", STATUS_BG_COLORS[status], className)}>
            <div className="flex items-center w-full">
                {/* Dropdown Container */}
                <div className="relative flex items-center h-full mr-2 z-20" ref={dropdownRef}>
                    <button
                        onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            setIsOpen(!isOpen);
                        }}
                        className={cn(
                            "w-3.5 h-3.5 rounded-sm shrink-0 transition-transform shadow-sm border border-black/10 flex items-center justify-center",
                            isOpen ? "scale-125 ring-2 ring-black/10" : "hover:scale-125",
                            STATUS_COLORS[status]
                        )}
                        title={"Status: " + STATUS_LABELS[status] + ". Click to change."}
                    />

                    {/* Dropdown Menu */}
                    {isOpen && (
                        <div className="absolute left-0 top-full mt-2 w-36 bg-white rounded-xl shadow-xl border border-neutral-100 py-1 z-50 overflow-hidden">
                            {(Object.keys(STATUS_COLORS) as FeatureStatus[]).map((s) => (
                                <button
                                    key={s}
                                    onClick={(e) => {
                                        e.preventDefault();
                                        e.stopPropagation();
                                        setStatus(featureId, s);
                                        setIsOpen(false);
                                    }}
                                    className="w-full text-left px-4 py-2 text-xs font-bold text-neutral-600 hover:bg-neutral-50 flex items-center gap-3 transition-colors"
                                >
                                    <div className={cn("w-3 h-3 rounded-sm shadow-sm", STATUS_COLORS[s])} />
                                    {STATUS_LABELS[s]}
                                </button>
                            ))}
                        </div>
                    )}
                </div>

                {/* Content */}
                <div className={cn(
                    "flex-1 transition-all duration-300 w-full z-10",
                    status === 'eliminated' && "line-through opacity-50 grayscale"
                )}>
                    {children}
                </div>
            </div>
        </div>
    );
}
