/* eslint-disable react/prop-types */
const SectionSubjects = ({ subjs, section }) => {
  return (
    <table>
      <tr>
        <th>Section</th>
        <td>{section}</td>
      </tr>
      <tr>
        <th>Subjects</th>
        <td>{subjs && subjs?.map((i) => <p key={i.id}>{i.subjectName}</p>)}</td>
      </tr>
    </table>
  );
};

export default SectionSubjects;
