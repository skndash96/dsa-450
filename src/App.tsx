import React, { useMemo } from 'react'
import { NotesProvider } from './hooks/useNotes'
import Home from './views/Home'
import Footer from './components/Footer'
import Header from './components/Header'
import { Route, Switch } from 'wouter'
import TopicPage from './views/TopicPage'
import NotFound from './views/404'
import { TopicsProvider } from './hooks/useTopics'
import { AuthProvider } from './hooks/useAuth'
import { NotifProvider } from './hooks/useNotifs'
import Account from './views/Account'
import Loading from './components/Loading'

function App() {
  return (
    <div id="wrapper" className='flex flex-col min-h-screen'>
      <NotifProvider>
        <AuthProvider>
          <TopicsProvider>
            <NotesProvider>
              <Header />
              <Loading />
              <Switch>
                <Route path="/" component={Home} />
                <Route path="/account" component={Account} />
                <Route path="/topics/*" component={TopicPage} />
                <Route component={NotFound} />
              </Switch>
              <Footer />
            </NotesProvider>
          </TopicsProvider>
        </AuthProvider>
      </NotifProvider>
    </div>
  )
}

export default App
