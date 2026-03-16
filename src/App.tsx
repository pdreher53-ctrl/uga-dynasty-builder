import React, { useState, useCallback } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useAuth } from './hooks/useAuth';
import { useProgress } from './hooks/useProgress';
import { Header } from './components/Header';
import { BottomNav } from './components/BottomNav';
import { LoginScreen } from './screens/LoginScreen';
import { DynastyHQ } from './screens/DynastyHQ';
import { RecruitBoard } from './screens/RecruitBoard';
import { RecruitDetail } from './screens/RecruitDetail';
import { TrainingFacility } from './screens/TrainingFacility';
import { Gameday } from './screens/Gameday';
import { FilmRoom } from './screens/FilmRoom';
import { XPPopup, LevelUpBanner } from './components/XPAnimation';
import { getXpLevel } from './utils/helpers';

function AppContent() {
  const { user, loading: authLoading, signIn, signOut, isDemoMode } = useAuth();
  const {
    loading: progressLoading,
    totalXp,
    streak,
    skillLevels,
    completedDrillIds,
    unlockedLessonIds,
    recruitPipeline,
    completeDrill,
    unlockLesson,
    updateRecruitPipeline,
  } = useProgress(user?.id);

  // XP animation state
  const [xpGain, setXpGain] = useState(0);
  const [showXp, setShowXp] = useState(false);
  const [levelUp, setLevelUp] = useState<{ level: number; title: string } | null>(null);

  const handleEarnXp = useCallback(
    (amount: number) => {
      const oldLevel = getXpLevel(totalXp).level;
      setXpGain(amount);
      setShowXp(true);
      setTimeout(() => setShowXp(false), 2000);

      // Check for level up
      const newLevel = getXpLevel(totalXp + amount);
      if (newLevel.level > oldLevel) {
        setTimeout(() => {
          setLevelUp({ level: newLevel.level, title: newLevel.title });
        }, 1000);
      }
    },
    [totalXp]
  );

  // Wrap completeDrill to trigger XP animation
  const handleCompleteDrill = useCallback(
    (drillId: string) => {
      completeDrill(drillId);
      // Trigger a small XP animation
      handleEarnXp(50);
    },
    [completeDrill, handleEarnXp]
  );

  if (authLoading) {
    return (
      <div className="min-h-screen bg-dawg-black flex items-center justify-center">
        <div className="text-center animate-fade-in">
          <div className="text-6xl mb-3 animate-bounce-gentle">🐶</div>
          <p className="text-dawg-silver text-sm">Boom is getting ready...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return <LoginScreen onSignIn={signIn} isDemoMode={isDemoMode} />;
  }

  if (progressLoading) {
    return (
      <div className="min-h-screen bg-dawg-black flex items-center justify-center">
        <div className="text-center animate-fade-in">
          <div className="text-5xl mb-3 animate-bounce-gentle">📊</div>
          <p className="text-dawg-silver text-sm">Loading your dynasty...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-dawg-black">
      {/* XP popup animation */}
      <XPPopup amount={xpGain} show={showXp} />

      {/* Level up celebration */}
      {levelUp && (
        <LevelUpBanner
          level={levelUp.level}
          title={levelUp.title}
          onDismiss={() => setLevelUp(null)}
        />
      )}

      <Routes>
        <Route
          path="/"
          element={
            <>
              <Header title="Dynasty HQ" onSignOut={signOut} isDemoMode={isDemoMode} />
              <DynastyHQ
                totalXp={totalXp}
                streak={streak}
                skillLevels={skillLevels}
                completedDrillIds={completedDrillIds}
              />
            </>
          }
        />
        <Route
          path="/recruits"
          element={
            <>
              <Header title="Recruit Board" onSignOut={signOut} isDemoMode={isDemoMode} />
              <RecruitBoard recruitPipeline={recruitPipeline} />
            </>
          }
        />
        <Route
          path="/recruits/:id"
          element={
            <>
              <Header title="Scout Report" onSignOut={signOut} isDemoMode={isDemoMode} />
              <RecruitDetail
                recruitPipeline={recruitPipeline}
                onUpdatePipeline={updateRecruitPipeline}
              />
            </>
          }
        />
        <Route
          path="/training"
          element={
            <>
              <Header title="Training Facility" onSignOut={signOut} isDemoMode={isDemoMode} />
              <TrainingFacility
                completedDrillIds={completedDrillIds}
                onCompleteDrill={handleCompleteDrill}
              />
            </>
          }
        />
        <Route
          path="/gameday"
          element={
            <>
              <Header title="Gameday" onSignOut={signOut} isDemoMode={isDemoMode} />
              <Gameday totalXp={totalXp} onEarnXp={handleEarnXp} />
            </>
          }
        />
        <Route
          path="/filmroom"
          element={
            <>
              <Header title="Film Room" onSignOut={signOut} isDemoMode={isDemoMode} />
              <FilmRoom
                unlockedLessonIds={unlockedLessonIds}
                onUnlockLesson={unlockLesson}
              />
            </>
          }
        />
      </Routes>
      <BottomNav />
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}
