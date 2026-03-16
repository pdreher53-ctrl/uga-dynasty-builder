import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useAuth } from './hooks/useAuth';
import { useProgress } from './hooks/useProgress';
import { Header } from './components/Header';
import { BottomNav } from './components/BottomNav';
import { SideNav } from './components/SideNav';
import { LoginScreen } from './screens/LoginScreen';
import { DynastyHQ } from './screens/DynastyHQ';
import { RecruitBoard } from './screens/RecruitBoard';
import { RecruitDetail } from './screens/RecruitDetail';
import { DailyCombine } from './screens/DailyCombine';
import { CourseCatalog } from './screens/CourseCatalog';
import { CourseDetail } from './screens/CourseDetail';
import { LessonView } from './screens/LessonView';
import { SeasonSimulator } from './screens/SeasonSimulator';

function AppLayout({
  title,
  onSignOut,
  isDemoMode,
  totalXp,
  streak,
  children,
}: {
  title: string;
  onSignOut: () => void;
  isDemoMode?: boolean;
  totalXp: number;
  streak: number;
  children: React.ReactNode;
}) {
  return (
    <div className="h-screen bg-dawg-black flex overflow-hidden">
      <SideNav
        onSignOut={onSignOut}
        isDemoMode={isDemoMode}
        totalXp={totalXp}
        streak={streak}
      />
      <div className="flex-1 flex flex-col min-h-0 lg:pl-64">
        <Header title={title} onSignOut={onSignOut} isDemoMode={isDemoMode} />
        <main className="flex-1 overflow-y-auto">
          {children}
        </main>
        <BottomNav />
      </div>
    </div>
  );
}

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
    completeLesson,
    updateRecruitPipeline,
  } = useProgress(user?.id);

  if (authLoading) {
    return (
      <div className="h-screen bg-dawg-black flex items-center justify-center">
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
      <div className="h-screen bg-dawg-black flex items-center justify-center">
        <div className="text-center">
          <div className="text-4xl mb-3">📊</div>
          <p className="text-dawg-silver text-sm">Loading your progress...</p>
        </div>
      </div>
    );
  }

  const layoutProps = { onSignOut: signOut, isDemoMode, totalXp, streak };

  return (
    <Routes>
      <Route
        path="/"
        element={
          <AppLayout title="Dynasty HQ" {...layoutProps}>
            <DynastyHQ
              totalXp={totalXp}
              streak={streak}
              skillLevels={skillLevels}
              completedDrillIds={completedDrillIds}
              completedLessonIds={unlockedLessonIds}
            />
          </AppLayout>
        }
      />
      <Route
        path="/recruits"
        element={
          <AppLayout title="Recruit Board" {...layoutProps}>
            <RecruitBoard recruitPipeline={recruitPipeline} />
          </AppLayout>
        }
      />
      <Route
        path="/recruits/:id"
        element={
          <AppLayout title="Scout Report" {...layoutProps}>
            <RecruitDetail
              recruitPipeline={recruitPipeline}
              onUpdatePipeline={updateRecruitPipeline}
            />
          </AppLayout>
        }
      />
      <Route
        path="/combine"
        element={
          <AppLayout title="Daily Combine" {...layoutProps}>
            <DailyCombine
              completedDrillIds={completedDrillIds}
              onCompleteDrill={completeDrill}
            />
          </AppLayout>
        }
      />
      <Route
        path="/courses"
        element={
          <AppLayout title="Courses" {...layoutProps}>
            <CourseCatalog completedLessonIds={unlockedLessonIds} />
          </AppLayout>
        }
      />
      <Route
        path="/courses/:courseId"
        element={
          <AppLayout title="Course" {...layoutProps}>
            <CourseDetail completedLessonIds={unlockedLessonIds} />
          </AppLayout>
        }
      />
      <Route
        path="/courses/:courseId/lesson/:lessonId"
        element={
          <AppLayout title="Lesson" {...layoutProps}>
            <LessonView
              completedLessonIds={unlockedLessonIds}
              onCompleteLesson={completeLesson}
            />
          </AppLayout>
        }
      />
      <Route
        path="/game"
        element={
          <AppLayout title="Season Simulator" {...layoutProps}>
            <SeasonSimulator
              totalXp={totalXp}
              onEarnXp={(id, xp) => completeLesson(id, xp)}
            />
          </AppLayout>
        }
      />
    </Routes>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}
