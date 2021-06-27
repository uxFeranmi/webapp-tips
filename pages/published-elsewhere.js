import styles from '../styles/published-elsewhere.module.scss';

export default function MyExternalArticles() {
	return <>
		<div className={styles.section}>
			<h2>Published Elsewhere</h2>
			<p>
				Articles I've written that are published on other platforms.
			</p>
		</div>

		<article className={styles.section}>
			<h3 className={styles.h3}>
				<a href="https://medium.com/buycoins/the-how-and-why-of-keyboard-accessibility-4795a83c899b">
					<span>The How and Why of Keyboard Accessibility</span>
					<br/>
					<small>Improving Keyboard Accessibility for Web Apps — Part 1</small>
				</a>
			</h3>
			<p>
				About 15% of the world’s population have some form of disability. That’s over 1 billion people!
				Everyone deserves a satisfying web browsing experience, and it’s our responsibility
				as web developers to ensure they have it.
				There’s a wide range of concerns relating to making web apps accessible for all users,
				and it can seem daunting to exhaustively cater to every one of them.
				This article series focuses on one basic accessibility concern: supporting alternative input devices,
				most commonly a keyboard. Generally, desktop users navigate the web with a mouse or...
			</p>
		</article>

		<article className={styles.section}>
			<h3 className={styles.h3}>
				<a href="https://medium.com/buycoins/use-semantic-html-8b2d4079ff7f">
					<span>Use Semantic HTML</span>
					<br/>
					<small>Improving Keyboard Accessibility for Web Apps — Part 2</small>
				</a>
			</h3>
			<p>
				Different HTML tags exist for specific purposes,
				and this is what semantic HTML is all about — using the
				right HTML tags in your web page based on their specified purpose.
				Perhaps the most important semantic elements...are the button and anchor link elements.
				Browsers recognize these elements and understand that they’re supposed to be interactive,
				and as such certain behaviours are associated with them out of the box.
				One such behaviour is that they receive keyboard focus by default.
				So a user tabbing through a web app will land on a button element naturally,
				but if you created that button with something
				like <code>&lt;div role=”button”&gt;</code> it will, by default, not receive focus when tabbing.
				Now it is possible to...
			</p>
		</article>

		<article className={styles.section}>
			<h3 className={styles.h3}>
				<a href="https://dev.to/uxferanmi/sassy-bem-2jlj">
					<span>Styling components with BEM and SCSS</span>
				</a>
			</h3>
			<p>
				Specificity, scoping, reusable code, code clarity⁠—these are major problems plaguing traditional CSS.
				If you've ever struggled with making something work in CSS, the reason likely traces back to something
				on this list. As you would expect, there are many tools in the ecosystem aimed at solving one or
				more of these issues. One is the popular BEM methodology.
				Another is the ubiquitous Sass preprocessor.
				I thought it would be great to take advantage of both, so I came up with a system
				for structuring my Syntactically Awesome StyleSheets...
			</p>
		</article>
	</>
};
