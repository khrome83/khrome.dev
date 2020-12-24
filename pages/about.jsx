import Head from "next/head";

const AboutPage = () => (
  <>
    <Head>
      <meta name='description' content="About Me" />
      <title>Khrome.dev - About Zane Milakovic</title>
    </Head>
    <h1 className="text-5xl py-4 text-center text-black py-20 mb-12">About Me</h1>
    <div className="prose max-w-4xl mx-auto px-4">
      <p>
        I have spent most of the last 20 years making things, typically with web technologies. I specialize in creating solid experiences that delight. I also enjoy building world-class teams.
      </p>
      <h2>Some of my Career</h2>
      <dl>
        <dt className="text-lg pb-2">Director of Technology for Inside Rx</dt>
        <dd className="mb-8">I am currently responsible for the technology organization of a startup. I oversee several teams that span multiple consumer-facing digital properties.</dd>
        <dt className="text-lg pb-2">Senior Developer for Rig Up</dt>
        <dd className="mb-8">I did a short stint at a startup that is changing the oil and gas industry. I built an optimizations platform and worked on improving the user experience. <em>#TooManyButtonDesigns</em></dd>
        <dt className="text-lg pb-2">UI &amp; Solution Architect for General Motors</dt>
        <dd className="mb-8">Oversaw the solution design and development powering the next generation of CMS platform. I managed the technical relationship with outside design agencies.</dd>
        <dt className="text-lg pb-2">Senior Developer for Army Research Labs</dt>
        <dd className="mb-8">The job was mostly <span className="text-purple-300 line-through">cowboy</span> contract development. I worked on a variety of internal tools and web properties, including analytics trackers, custom calendars, WebGL powered apps, and more.</dd>
      </dl>
    </div>
  </>
);

export default AboutPage;
