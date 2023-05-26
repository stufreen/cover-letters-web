import "./Header.css";
import { Sparkles } from "./Sparkles";

export const Header = () => {
  return (
    <header className="header">
      <h1 className="header--text">
        Cover Letter{" "}
        <span class="header--text__gradient">
          Magic
          <Sparkles />
        </span>
      </h1>
      <p class="header--body">
        Let artificial intelligence write the first draft of your cover letter.
        Copy in the job description from the posting along with your own
        qualifications from your resume and see what it comes back with.
      </p>
    </header>
  );
};
