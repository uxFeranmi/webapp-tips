import path from "path";
import fs from "fs/promises";
import parseFrontMatter from "front-matter";
import { marked } from "marked";

// relative to the server output not the source!
const postsPath = path.join(__dirname, "../..", "posts");

export async function getPosts() {
  const dir = await fs.readdir(postsPath);
  return Promise.all(
    dir.map(async filename => {
      const file = await fs.readFile(
        path.join(postsPath, filename)
      );
      const { attributes } = parseFrontMatter(
        file.toString()
      );
      return {
        slug: filename.replace(/\.md$/, ""),
        title: attributes.title
      };
    })
  );
}

export async function getPost(slug) {
	const filepath = path.join(postsPath, slug + ".md");
	const file = await fs.readFile(filepath);
	const { attributes, body } = parseFrontMatter(
	  file.toString()
	);
	const html = marked(body);
	return { slug, html, title: attributes.title };
}

export async function createPost(post) {
  const md = `---\ntitle: ${post.title}\n---\n\n${post.markdown}`;
  await fs.writeFile(
    path.join(postsPath, post.slug + ".md"),
    md
  );
  return getPost(post.slug);
}