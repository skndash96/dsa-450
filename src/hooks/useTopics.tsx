import { createContext, useContext } from "react"
import { Topic } from "../services/dbService"
import React from 'react'
import dataFinal from "../dataFinal"
import { getTopicKeyFromName } from "../utils/functions"

export const TopicsContext = createContext<Record<string, Topic>>({})

export function useTopics() {
  const topics = useContext(TopicsContext)

  if (!topics) {
    throw new Error('useTopics must be used within a TopicsProvider')
  }

  return topics
}

export function useTopic(key: string) {
  const topics = useTopics()

  if (!topics) {
    throw new Error('useTopic must be used within a TopicsProvider')
  }

  return topics[key]
}

export function TopicsProvider({
  children
}: {
  children: React.ReactNode
}) {
  const topics = dataFinal.reduce((acc, topic) => {
    acc[getTopicKeyFromName(topic.name)] = topic
    return acc
  }, {} as Record<string, Topic>)

  return (
    <TopicsContext.Provider value={topics}>
      {children}
    </TopicsContext.Provider>
  )
}