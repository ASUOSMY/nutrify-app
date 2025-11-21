'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { UserProfile, DailyLog, Workout, Challenge } from './nutrify-types';

interface NutrifyContextType {
  userProfile: UserProfile | null;
  setUserProfile: (profile: UserProfile) => void;
  dailyLog: DailyLog | null;
  setDailyLog: (log: DailyLog) => void;
  workouts: Workout[];
  setWorkouts: (workouts: Workout[]) => void;
  challenges: Challenge[];
  setChallenges: (challenges: Challenge[]) => void;
  isOnboarded: boolean;
  setIsOnboarded: (value: boolean) => void;
}

const NutrifyContext = createContext<NutrifyContextType | undefined>(undefined);

export function NutrifyProvider({ children }: { children: React.ReactNode }) {
  const [userProfile, setUserProfileState] = useState<UserProfile | null>(null);
  const [dailyLog, setDailyLogState] = useState<DailyLog | null>(null);
  const [workouts, setWorkoutsState] = useState<Workout[]>([]);
  const [challenges, setChallengesState] = useState<Challenge[]>([]);
  const [isOnboarded, setIsOnboardedState] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Carregar dados do localStorage
    const savedProfile = localStorage.getItem('nutrify_profile');
    const savedLog = localStorage.getItem('nutrify_daily_log');
    const savedWorkouts = localStorage.getItem('nutrify_workouts');
    const savedChallenges = localStorage.getItem('nutrify_challenges');
    const savedOnboarded = localStorage.getItem('nutrify_onboarded');

    if (savedProfile) setUserProfileState(JSON.parse(savedProfile));
    if (savedLog) setDailyLogState(JSON.parse(savedLog));
    if (savedWorkouts) setWorkoutsState(JSON.parse(savedWorkouts));
    if (savedChallenges) setChallengesState(JSON.parse(savedChallenges));
    if (savedOnboarded) setIsOnboardedState(JSON.parse(savedOnboarded));
  }, []);

  const setUserProfile = (profile: UserProfile) => {
    setUserProfileState(profile);
    if (mounted) localStorage.setItem('nutrify_profile', JSON.stringify(profile));
  };

  const setDailyLog = (log: DailyLog) => {
    setDailyLogState(log);
    if (mounted) localStorage.setItem('nutrify_daily_log', JSON.stringify(log));
  };

  const setWorkouts = (workouts: Workout[]) => {
    setWorkoutsState(workouts);
    if (mounted) localStorage.setItem('nutrify_workouts', JSON.stringify(workouts));
  };

  const setChallenges = (challenges: Challenge[]) => {
    setChallengesState(challenges);
    if (mounted) localStorage.setItem('nutrify_challenges', JSON.stringify(challenges));
  };

  const setIsOnboarded = (value: boolean) => {
    setIsOnboardedState(value);
    if (mounted) localStorage.setItem('nutrify_onboarded', JSON.stringify(value));
  };

  return (
    <NutrifyContext.Provider
      value={{
        userProfile,
        setUserProfile,
        dailyLog,
        setDailyLog,
        workouts,
        setWorkouts,
        challenges,
        setChallenges,
        isOnboarded,
        setIsOnboarded,
      }}
    >
      {children}
    </NutrifyContext.Provider>
  );
}

export function useNutrify() {
  const context = useContext(NutrifyContext);
  if (context === undefined) {
    throw new Error('useNutrify must be used within a NutrifyProvider');
  }
  return context;
}
