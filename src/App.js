import React from 'karet';
import * as U from 'karet.util';
import { fromPromise, constant } from 'kefir';
import './App.css';

//

const store = U.atom({});

const activePostIn = U.view('activePost');

//

const request = url => fromPromise(fetch(url));
const json = response => fromPromise(response.json());

const posts =
  U.seq(constant('https://jsonplaceholder.typicode.com/posts'),
        U.flatMapLatest(request),
        U.flatMapLatest(json));

// const postCount = U.length(posts);
const postCount = posts.map(x => x.length);

//

const Post = ({ post, activePost }) =>
  <article key={post.id}
           onClick={() => activePost.set(post.id)}
           className={U.cns('post',
                            U.ift(U.equals(activePost, post.id), 'active'))}>
    <h3>{post.title}</h3>
    <p>{post.body}</p>

    <hr />
  </article>;

const App = () =>
  <section className="app">
    <header>
      <h1>Showing {postCount} posts</h1>
    </header>

    <div>
      {U.seq(posts,
              U.map(post =>
                <Post post={post} activePost={activePostIn(store)} />))}
    </div>
  </section>;

export default App;
