import * as React from "react";

export default function Help() {
  return (
    <div>
      <div className="help">
        <h1 className="help__head">BookIt Help</h1>
        <p>This is the F.A.Q. page for BookIt.</p>
      </div>
      <div className="faq">
        <h2 className="faq__question">How does BookIt work?</h2>
        <p className="faq__answer">Bookit uses our own special algorithm to determine what books are right for you based on your interests.</p>

        <h2 className="faq__question">Where do the books come from?</h2>
        <p className="faq__answer">We use OpenLibrary's API of free books and have crawled Amazon's reviews to cumulate the best books for everyone.</p>

        <h2 className="faq__question">Are all the books free to read?</h2>
        <p className="faq__answer">No. All of the books from OpenLibrary are free, but books coming from Amazon will have a price tag. You can filter by prices to make sure we are hitting price points that are comfortable to our consumer.</p>

        <h2 className="faq__question">Is BookIt free to use?</h2>
        <p className="faq__answer">Yes! BookIt is and always will be free and open source.</p>
      </div>
    </div>
  );
}
