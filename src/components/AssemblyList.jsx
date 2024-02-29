export default function AssemblyList({ assemblyArray, onSelectOption }) {
  console.log(assemblyArray.uid);
  function handleChange(event) {
    const uid = event.target.value;
    onSelectOption(assemblyArray.find((assembly) => assembly.uid === uid));
  }
  return (
    <select onChange={handleChange}>
      {assemblyArray.map((assemblies) => (
        <option key={assemblies.uid} value={assemblies.uid}>
          UID {assemblies.uid} Date {assemblies.asmupdatedate} Assembly Name
          {assemblies.assemblyname} Organism {assemblies.organism}
        </option>
      ))}
    </select>
  );
}
