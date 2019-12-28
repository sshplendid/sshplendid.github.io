

# 세상에서 가장 오해받던 프로그래밍 언어가 제일 인기있는 언어가 되다.

Douglas Crockford
2008-03-03

Jean Sammet은 1969년에 [Computer Languages: History and Fundamentals](https://www.amazon.com/exec/obidos/ASIN/B000OIVLUQ/wrrrldwideweb)라는, 120가지 프로그래밍 언어에 대한 책을 썼다. Sammet'의 책은 구조적 프로그래밍 혁명 전부터 객체지향 개발 후까지의 언어를 연대순으로 기록했다. 책의 커버는 바벨탑의 사진이었고, 탑을 구성하는 수많은 벽돌에 프로그래밍 언어의 이름을 새겼다.

이 것은 훌륭한 공학 기술이 세계를 통일한 도시와 탑을 건설하는데 응용되었던 창세기[11:1-9]를 가리킨다.

> 처음에 세상에는 언어가 하나뿐이어서, 모두가 같은 말을 썼다.
사람들이 동쪽에서 이동하여 오다가, 시날 땅 한 들판에 이르러서, 거기에 자리를 잡았다.
그들은 서로 말하였다. “자, 벽돌을 빚어서, 단단히 구워내자.” 사람들은 돌 대신에 벽돌을 쓰고, 흙 대신에 역청을 썼다.
그들은 또 말하였다. “자, 도시를 세우고, 그 안에 탑을 쌓고서, 탑 꼭대기가 하늘에 닿게 하여, 우리의 이름을 날리고, 온 땅 위에 흩어지지 않게 하자.”
주께서는, 사람들이 짓고 있는 도시와 탑을 보려고 내려오셨다.
주께서 말씀하셨다. “보아라, 만일 사람들이 같은 말을 쓰는 한 백성으로서, 이렇게 이런 일을 하기 시작하였으니, 이제 그들은, 하고자 하는 것은 무엇이든지, 하지 못할 일이 없을 것이다.
자, 우리가 내려가서, 그들이 거기에서 하는 말을 뒤섞어서, 그들이 서로 알아듣지 못하게 하자.”
주께서 거기에서 그들을 온 땅으로 흩으셨다. 그래서 그들은 도시 세우는 일을 그만두었다.
주께서 거기에서 온 세상의 말을 뒤섞으셨다고 하여, 사람들은 그 곳의 이름을 바벨이라고 한다. 주께서 거기에서 사람들을 온 땅에 흩으셨다.


But the LORD came down to see the city and the tower which the sons of men had built. And the LORD said, “Indeed the people are one and they all have one language, and this is what they begin to do; now nothing that they propose to do will be withheld from them. Come, let Us go down and there confuse their language, that they may not understand one another’s speech.” So the LORD scattered them abroad from there over the face of all the earth, and they ceased building the city. Therefore its name is called Babel, because there the LORD confused the language of all the earth; and from there the LORD scattered them abroad over the face of all the earth.

Sometimes this is read as a warning against hubris. Sometimes this is read as a just-so story explaining why people speak so many languages: The LORD created the I18N Problem to prevent humanity from reaching its potential. But I think its truest interpretation is as a metaphor for programming language design. The principle problem in programming is the management of complexity. If a language does not help us to manage very complex systems in the face of changing requirements, then confusion results, and failure follows.

Why are there so many programming languages? Beyond the Sammet set, there have been lots of new languages and dialects developed over the past 40 years. We have been programming at a High Level for a very long time. Shouldn't we have converged on the right way to do it by now? There are obvious efficiencies that would be obtained from the design and adoption of a single, perfect language. We could focus our resources more effectively on training and tool development. Why haven't we done that?

We have been trying. There have been several attempts to build massive, universal languages. They all failed. As a language design grows, increasing its applicability, it becomes more and more complex. Designers who makes their language too complex will confuse the language, sayeth the LORD.

So we see instead a large number of more specialized languages. A specialized language will be very effective for some range of tasks. And that's good enough. For people who have to accomplish those tasks, having the the right language can be, well, a godsend.

A programming language cobbles a model of computation with some sort of expressive syntax. Most languages will have a set of useful values such as numbers and texts (which most languages, strangely, call strings), and operations that mutate and synthesize values and some form of variation or repetition, and some way of packaging operations into more convenient idioms. The variations that are possible are endless, much like the variations possible in the preparation of a fine meal or a work of music. The art in language design is knowing what to leave out. The features of a good language work together harmoniously. A good language helps us to better understand a problem and to find the best expression of its solution.

A good language is composed of a limited set of features. But there is little agreement on which features are best. Programmers can argue endlessly about features and whether they make one language better than another. This does not mean that the features don't matter. They matter greatly. We just don't understand yet how they matter.

Language design has more to do with fashion than technology. It may seem strange that fashion is a major factor in the nerdliest of arts, but it is true. A language with radically different syntax, for example, has no hope of finding broad adoption, regardless of the brilliance of its design. This tends to constrain the rate at which languages evolve.

Like music and food, a programming language can be a product of its time. The deep problem in language design is not technological, it is psychological. A programming language should equip us with structures that help us to reason more effectively.

Programming languages are like cats. It is easier to get a new cat than to get an old cat fixed. Most successful languages are ultimately replaced by upstarts. Remodeled languages rarely match the glory of the original. Fortran was once the king of languages. It has been revised several times over the years, but the modernized dialects experienced a fraction of the prestige of Fortran IV. Similarly, Pascal was a popular structured programming language, but none of the object oriented dialects ever approached Pascal's glory. Instead, languages tend to be superseded.

Specialized languages are fun to make, which partly explains why there are so many. If a language doesn't get too big, it can be managed by a single designer. Most languages can be identified with a single designer. Pascal: Wirth. C: Ritchie. C++: Stroustrup. Java: Gosling. C#: Hejlsberg. Rebol: Sassenrath. Python: van Rossum. PHP: Lerdorf. Perl: Wall. Ruby: Matsumoto. Lua: Ierusalimschy. E: Miller. JavaScript: Eich.

Most languages die in obscurity. Only a few are able to build a following beyond a single project or company. And only a very small number of languages become important.

There are two ways that a language becomes important. The first is as a source or proving ground for important ideas. This includes languages like Smalltalk and Scheme. These languages are not widely used, but are generally recognized as brilliant, but out of fashion. They have a powerful influence on language designers.

The second way that a language becomes important is by becoming popular.

There are many things that a programmer must consider when selecting a program language unless that programmer is writing for web browsers where the only choice currently is JavaScript.

JavaScript is an astonishing language, in the very worst sense. Its astonishing nature led to a very bad reputation. JavaScript is also coupled with The DOM, a horrendous API. There is a lot of confusion about where JavaScript ends and the DOM begins. There is lots of chatter about improving JavaScript, but that by itself would do little to improve the lives of web developers. The language is burdened with too many features, including many that interact badly or were poorly designed. It is a language that has, as Emperor Joseph would say, too many notes.

So how did a language with such obvious deficiencies become the Sole Programming Language of the Web? Brendan Eich convinced his pointy-haired boss at Netscape that the Navigator browser should have its own scripting language, and that only a new language would do, a new language designed and implemented in big hurry, and that no existing language should be considered for that role. The Internet Explorer team at Microsoft wanted to capture Netscape's market share, so they carefully reverse engineered Netscape's language, huge hairy warts and all. The other browser makers followed Microsoft's lead. There is no standard that says that a web browser must implement JavaScript; JavaScript is the only language implemented in all popular web browsers. There was no careful review of the language or its problem domain. There was no review of its suitability or the soundness of its design. It was slapped together at Netscape, and then copied elsewhere. Given the process that created JavaScript and made it a de facto standard, we deserve something far worse.

But despite JavaScript's astonishing shortcomings, deep down, in its core, it got something very right. When you peel away the cruft, there is an expressive and powerful programming language there. That language is being used well in many Ajax libraries to manage and augment the DOM, producing an application platform for interactive applications delivered as web pages. Ajax has become popular because JavaScript works. It works surprisingly well.

JavaScript was the world's most misunderstood programming language. Its obvious defects, its unfashionable programming model, intentional mispositioning at its introduction, and its ridiculous name caused it to be rejected as unworthy by most knowledgeable programmers. But Ajax gave JavaScript a second chance.

Because JavaScript is the language of the web browser, and because the web browser has become the dominant application delivery system, and because JavaScript isn't too bad, JavaScript has become the World's Most Popular Programming Language. Its popularity is growing. It is now being embedded in other applications and contexts. JavaScript has become important.

It is better to be lucky than smart.
