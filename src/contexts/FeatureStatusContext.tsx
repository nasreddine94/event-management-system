import React, { createContext, useContext, useState, useEffect } from 'react';

export type FeatureStatus = 'future' | 'next-phase' | 'built' | 'eliminated';

interface FeatureStatusContextType {
    statuses: Record<string, FeatureStatus>;
    setStatus: (featureId: string, status: FeatureStatus) => void;
    getStatus: (featureId: string) => FeatureStatus;
}

const FeatureStatusContext = createContext<FeatureStatusContextType | undefined>(undefined);

export function FeatureStatusProvider({ children }: { children: React.ReactNode }) {
    const [statuses, setStatuses] = useState<Record<string, FeatureStatus>>(() => {
        const saved = localStorage.getItem('feature_prioritization_statuses');
        return saved ? JSON.parse(saved) : {};
    });

    useEffect(() => {
        localStorage.setItem('feature_prioritization_statuses', JSON.stringify(statuses));
    }, [statuses]);

    const setStatus = (featureId: string, status: FeatureStatus) => {
        setStatuses(prev => ({ ...prev, [featureId]: status }));
    };

    const getStatus = (featureId: string) => statuses[featureId] || 'built';

    return (
        <FeatureStatusContext.Provider value={{ statuses, setStatus, getStatus }}>
            {children}
        </FeatureStatusContext.Provider>
    );
}

export function useFeatureStatus() {
    const context = useContext(FeatureStatusContext);
    if (context === undefined) {
        throw new Error('useFeatureStatus must be used within a FeatureStatusProvider');
    }
    return context;
}
