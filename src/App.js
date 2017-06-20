import React from 'karet';
import * as U from 'karet.util';
import { fromPromise, constant } from 'kefir';
import './App.css';

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

const App = () =>
  <section>
    <header>
      <h1>Showing {postCount} posts</h1>
    </header>

    <div>
      {U.seq(posts,
              U.map(post =>
                <article key={post.id}>
                  <h3>{post.title}</h3>
                  <p>{post.body}</p>

                  <hr />
                </article>))}
    </div>
  </section>;

export default App;
