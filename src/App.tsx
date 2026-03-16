import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useAuth } from './hooks/useAuth';
import { useProgress } from './hooks/useProgress';
import { Header } from './components/Header';
import { BottomNav } from './components/BottomNav';
import { LoginScreen } from './screens/LoginScreen';
import { DynastyHQ } from './screens/DynastyHQ';
import { RecruitBoard } from './screens/RecruitBoard';
import { RecruitDetail } from './screens/RecruitDetail';
import { DailyCombine } from './screens/DailyCombine';
import { FilmRoom } from './screens/FilmRoom';

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

  if (authLoading) {
    return (
      <div className="min-h-screen bg-dawg-black flex items-center justify-center">
        <div className="text-center">
          <div className="text-4xl mb-3">🏈</div>
          <p className="text-dawg-silver text-sm">Loading...</p>
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
        <div className="text-center">
          <div className="text-4xl mb-3">📊</div>
          <p className="text-dawg-silver text-sm">Loading your progress...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-dawg-black">
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
          path="/combine"
          element={
            <>
              <Header title="Daily Combine" onSignOut={signOut} isDemoMode={isDemoMode} />
              <DailyCombine
                completedDrillIds={completedDrillIds}
                onCompleteDrill={completeDrill}
              />
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
