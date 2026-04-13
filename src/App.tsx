/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import Layout from './components/Layout';
import Onboarding from './components/Onboarding';
import PostCard from './components/PostCard';
import CreatePost from './components/CreatePost';
import GameModes from './components/GameModes';
import About from './components/About';
import Admin from './components/Admin';
import { useFirebase } from './contexts/FirebaseContext';
import { signInWithGoogle } from './firebase';
import { Ghost } from 'lucide-react';

export default function App() {
  const { 
    user, 
    loading, 
    currentSpace, 
    posts, 
    joinSpace, 
    createSpace, 
    createPost,
    echoPost
  } = useFirebase();
  
  const [activeTab, setActiveTab] = useState<'feed' | 'games' | 'info' | 'settings'>('feed');

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-void-black">
        <Ghost className="w-8 h-8 text-void-purple animate-pulse" />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-8 bg-void-black text-white">
        <div className="w-20 h-20 bg-void-purple rounded-sm flex items-center justify-center ghost-glow mb-8">
          <Ghost className="w-12 h-12 text-white" />
        </div>
        <h1 className="text-6xl font-mono font-bold tracking-tighter mb-2">VOID</h1>
        <p className="text-white/40 font-mono text-xs uppercase tracking-[0.3em] mb-12 text-center">Say anything. Own nothing.</p>
        
        <button 
          onClick={() => signInWithGoogle()}
          className="brutalist-button py-4 px-8 text-sm font-mono flex items-center gap-3"
        >
          <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" className="w-5 h-5" alt="Google" />
          <span>SIGN IN WITH GOOGLE</span>
        </button>
      </div>
    );
  }

  if (!currentSpace) {
    return <Onboarding onJoin={joinSpace} onCreate={createSpace} />;
  }

  return (
    <Layout 
      activeTab={activeTab} 
      setActiveTab={setActiveTab} 
      spaceName={currentSpace.name}
    >
      {activeTab === 'feed' && (
        <div className="p-4">
          <CreatePost onPost={createPost} />
          <div className="space-y-4">
            {posts.map(post => (
              <PostCard 
                key={post.id} 
                post={post} 
                onEcho={() => echoPost(post.id)}
              />
            ))}
            {posts.length === 0 && (
              <div className="py-20 text-center">
                <p className="text-white/20 font-mono text-xs uppercase tracking-widest">The void is empty.</p>
              </div>
            )}
          </div>
        </div>
      )}

      {activeTab === 'games' && <GameModes />}
      {activeTab === 'info' && <About />}
      {activeTab === 'settings' && <Admin />}
    </Layout>
  );
}

