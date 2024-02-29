import AssemblyList from "./components/AssemblyList";
import InputText from "./components/inputText";
import { useState } from "react";
import "./App1.css";

export default function App() {
  const [assemblyOptions, setAssemblyOptions] = useState([]);
  const [selectedAssembly, setSelectedAssembly] = useState(null);
  console.log(selectedAssembly);
  const fetchInputValue = async (inputValue) => {
    const apiurl = `https://eutils.ncbi.nlm.nih.gov/entrez/eutils/esearch.fcgi?db=assembly&term=${inputValue}&retmode=json&retmax=10000`;
    const response = await fetch(apiurl);
    const responseJSON = await response.json();
    console.log(responseJSON);
    const idList = responseJSON.esearchresult.idlist;
    console.log(idList);
    const idListJoined = idList.join(",");
    const apiurl2 = `https://eutils.ncbi.nlm.nih.gov/entrez/eutils/esummary.fcgi?db=assembly&id=${idListJoined}&retmode=json&`;
    const response2 = await fetch(apiurl2);
    const responseJSON2 = await response2.json();
    console.log(responseJSON2);
    const assemblyList = Object.values(responseJSON2.result).filter(
      (item) => item.uid !== undefined
    );
    console.log(assemblyList);
    setAssemblyOptions(assemblyList);
  };
  return (
    <div>
      <h1>NCBI Assembly Search</h1>
      <InputText onValueSubmitted={fetchInputValue} />
      <AssemblyList
        assemblyArray={assemblyOptions}
        onSelectOption={setSelectedAssembly}
      />
      {console.log(selectedAssembly)}
      {selectedAssembly && (
        <table>
          <thead>
            <tr>
              <th>Assembly Description</th>
              <th>Submitter Organisation</th>
              <th>UCSC Name</th>
              <th>UID</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{selectedAssembly.assemblydescription}</td>
              <td>{selectedAssembly.submitterorganization}</td>
              <td>{selectedAssembly.ucscname}</td>
              <td>{selectedAssembly.uid}</td>
            </tr>
          </tbody>
        </table>
      )}
    </div>
  );
}
