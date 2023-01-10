import "./InfoSection.css";

interface InfoSectionProps {
  title: string;
  body: string | number | JSX.Element;
}

function InfoSection({ title, body }: InfoSectionProps) {
  return (
    <section className="InfoSection">
      <div className="info-section_title">{title}</div>
      <div className="info-section_body">{body}</div>
    </section>
  );
}

export default InfoSection;
