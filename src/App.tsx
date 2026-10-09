import React from 'react';
import { FilterProvider, useFilter } from './context/FilterContext';
import { AssistantProvider } from './context/AssistantContext';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { ActiveFiltersBar } from './components/ActiveFiltersBar';
import { GlobalFiltersModal } from './components/GlobalFiltersModal';
import { ContextualAssistant } from './components/ContextualAssistant';

// Views
import { OverviewView } from './views/OverviewView';
import { PerformanceView } from './views/PerformanceView';
import { TerritorialView } from './views/TerritorialView';
import { ComparisonView } from './views/ComparisonView';
import { ConcentrationView } from './views/ConcentrationView';
import { ZonesSectionsView } from './views/ZonesSectionsView';
import { SpatialView } from './views/SpatialView';
import { ReportsView } from './views/ReportsView';
import { MethodologyView } from './views/MethodologyView';

const MainContent: React.FC = () => {
  const { activeTab } = useFilter();

  const renderActiveView = () => {
    switch (activeTab) {
      case 'overview':
        return <OverviewView />;
      case 'performance':
        return <PerformanceView />;
      case 'territorial':
        return <TerritorialView />;
      case 'comparison':
        return <ComparisonView />;
      case 'concentration':
        return <ConcentrationView />;
      case 'zones-sections':
        return <ZonesSectionsView />;
      case 'spatial':
        return <SpatialView />;
      case 'reports':
        return <ReportsView />;
      case 'methodology':
        return <MethodologyView />;
      default:
        return <OverviewView />;
    }
  };

  return (
    <div className="flex-1 flex flex-col min-w-0 bg-neutral-100/60 overflow-y-auto">
      <Header />
      <ActiveFiltersBar />
      <main className="flex-1 p-6 max-w-7xl w-full mx-auto">
        {renderActiveView()}
      </main>
      <GlobalFiltersModal />
      <ContextualAssistant />
    </div>
  );
};

export default function App() {
  return (
    <FilterProvider>
      <AssistantProvider>
        <div className="flex h-screen w-screen overflow-hidden bg-neutral-100 font-sans text-neutral-900">
          <Sidebar />
          <MainContent />
        </div>
      </AssistantProvider>
    </FilterProvider>
  );
}
