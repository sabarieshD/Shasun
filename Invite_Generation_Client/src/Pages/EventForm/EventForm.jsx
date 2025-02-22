import { useState, useEffect } from 'react';
import './EventForm.css';  // Import the CSS file

export default function CertificateForm() {
  const [formData, setFormData] = useState({
    recipientName: '',
    eventTitle: '',
    subtitle: '',
    date: '',
    time: '',
    venue: '',
    organization: '',
    clubName: '',
    department: 'UG', // default UG
    course: 'BSc Computer Science' // default UG course
  });

  const [files, setFiles] = useState({
    clubLogo: null,
    // collegeLogo: null
  });

  const [enableAgenda, setEnableAgenda] = useState(false);
  const [agendaList, setAgendaList] = useState([]);

  // New state for dynamic Titles (max 3)
  const [titles, setTitles] = useState([]);

  // Dynamic Chief Guests State
  const [numChiefGuests, setNumChiefGuests] = useState(0);
  // Set default salutation to "MR." instead of an empty string.
  const [chiefGuestsData, setChiefGuestsData] = useState([]); // { salutation, name, designation, additionalText, image }

  // Dynamic Collaborators State (max 2)
  const [numCollaborators, setNumCollaborators] = useState(0);
  const [collaboratorsData, setCollaboratorsData] = useState([]); // { name, logo }

  // Dropdown options for courses
  const ugCourses = [
    "BSc - Computer Science",
    "BSc - Mathematics",
    "BSc - Physchology",
    "BSc - Visual Communication",
    "BSc - Home Science Interior Design & Decor",
    "B.com - Honours",
    "B.com - General",
    "B.com - Accounting & Finance",
    "B.com - Corporate Secretaryship",
    "B.com - Bank Management",
    "B.com - Computer Application",
    "BBA",
    "BCA",
    "B.A. - English"
  ];
  const pgCourses = [
    "Department of Journalism and Communication",
    "Department of Visual Communication",
    "Department of Psychology",
    "Department of Commerce"
  ];
  const pgResearchCourses = [
    "Department of Commerce",
    "Department of Computer Science"
  ];

  // Update course when department changes
  useEffect(() => {
    if (formData.department === 'UG') {
      setFormData(prev => ({ ...prev, course: ugCourses[0] }));
    } else if (formData.department === 'PG') {
      setFormData(prev => ({ ...prev, course: pgCourses[0] }));
    } else if (formData.department === 'PG & Research') {
      setFormData(prev => ({ ...prev, course: pgResearchCourses[0] }));
    }
  }, [formData.department]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    const { name } = e.target;
    const filesArray = e.target.files;
    setFiles(prev => ({
      ...prev,
      [name]:
        name === 'clubLogo' || name === 'collegeLogo'
          ? filesArray[0]
          : Array.from(filesArray)
    }));
  };

  // Chief Guests Handlers
  const handleNumChiefGuestsChange = (e) => {
    const num = parseInt(e.target.value, 10);
    setNumChiefGuests(num);
    const newData = [];
    for (let i = 0; i < num; i++) {
      newData.push({
        salutation: 'MR.', // Default salutation set to "MR."
        name: '',
        designation: '',
        additionalText: '',
        image: null
      });
    }
    setChiefGuestsData(newData);
  };

  const handleChiefGuestChange = (index, field, value) => {
    const updated = [...chiefGuestsData];
    updated[index] = { ...updated[index], [field]: value };
    setChiefGuestsData(updated);
  };

  const handleChiefGuestImageChange = (index, file) => {
    const updated = [...chiefGuestsData];
    updated[index] = { ...updated[index], image: file };
    setChiefGuestsData(updated);
  };

  // Collaborators Handlers
  const handleNumCollaboratorsChange = (e) => {
    const num = parseInt(e.target.value, 10);
    setNumCollaborators(num);
    const newData = [];
    for (let i = 0; i < num; i++) {
      newData.push({ name: '', logo: null });
    }
    setCollaboratorsData(newData);
  };

  const handleCollaboratorChange = (index, value) => {
    const updated = [...collaboratorsData];
    updated[index] = { ...updated[index], name: value };
    setCollaboratorsData(updated);
  };

  const handleCollaboratorLogoChange = (index, file) => {
    const updated = [...collaboratorsData];
    updated[index] = { ...updated[index], logo: file };
    setCollaboratorsData(updated);
  };

  // Agenda Handlers
  const handleAddAgenda = () => {
    if (agendaList.length < 10) {
      setAgendaList([...agendaList, ""]);
    }
  };

  const handleRemoveAgenda = (index) => {
    setAgendaList(agendaList.filter((_, i) => i !== index));
  };

  const handleAgendaChange = (index, value) => {
    const updated = [...agendaList];
    updated[index] = value;
    setAgendaList(updated);
  };

  // Titles Handlers (up to 3 titles)
  const handleAddTitle = () => {
    if (titles.length < 3) {
      setTitles([...titles, ""]);
    }
  };

  const handleRemoveTitle = (index) => {
    setTitles(titles.filter((_, i) => i !== index));
  };

  const handleTitleChange = (index, value) => {
    const updated = [...titles];
    updated[index] = value;
    setTitles(updated);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = new FormData();

    // Append form data
    Object.keys(formData).forEach((key) => {
      form.append(key, formData[key]);
    });
    if (enableAgenda) {
      agendaList.forEach((item) => form.append('agendaList', item));
    }
    titles.forEach((title) => form.append('titles', title));
    Object.keys(files).forEach((key) => {
      if (Array.isArray(files[key])) {
        files[key].forEach((file) => form.append(key, file));
      } else if (files[key]) {
        form.append(key, files[key]);
      }
    });

    // Append Chief Guests data with salutation included
    const guestsDetails = chiefGuestsData.map(guest => ({
      salutation: guest.salutation,
      name: guest.name,
      designation: guest.designation,
      additionalText: guest.additionalText
    }));
    form.append('chiefGuests', JSON.stringify(guestsDetails));
    chiefGuestsData.forEach((guest, index) => {
      if (guest.image) {
        form.append('chiefGuestImages', guest.image, `${index}_${guest.image.name}`);
      }
    });

    // Append Collaborators data
    form.append('collaborators', JSON.stringify(collaboratorsData));
    collaboratorsData.forEach((collaborator, index) => {
      if (collaborator.logo) {
        form.append('collaboratorLogos', collaborator.logo, `${index}_${collaborator.logo.name}`);
      }
    });

    try {
      const response = await fetch('http://localhost:5000/certificate/generate-certificate', {
        method: 'POST',
        body: form
      });
      if (response.ok) {
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        // Open the preview in a new tab
        window.open(url, '_blank');
      } else {
        console.error('Failed to generate certificate');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="container">
      <h2 className="text-xl font-bold mb-4">Generate Invite</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input 
          type="text" 
          name="eventTitle" 
          placeholder="Event Title" 
          onChange={handleChange} 
          required 
        />
        <input 
          type="text" 
          name="subtitle" 
          placeholder="Subtitle" 
          onChange={handleChange} 
        />
        <input 
          type="date" 
          name="date" 
          onChange={handleChange} 
          required 
        />
        <input 
          type="time" 
          name="time" 
          min="08:00" 
          max="18:00" 
          onChange={handleChange} 
          required 
        />  
        <input 
          type="text" 
          name="venue" 
          placeholder="Venue" 
          onChange={handleChange} 
          required 
        />
        <input 
          type="text" 
          name="organization" 
          placeholder="Organization" 
          onChange={handleChange} 
          required 
        />

        {/* Department & Course */}
        <div className="flex flex-col space-y-2">
          <label>Department (UG/PG):</label>
          <select
            name="department"
            value={formData.department}
            onChange={handleChange}
          >
            <option value="UG">UG</option>
            <option value="PG">PG</option>
            <option value="PG & Research">PG & Research</option>
          </select>
          <label>Course:</label>
          <select
            name="course"
            value={formData.course}
            onChange={handleChange}
          >
            {formData.department === 'UG'
              ? ugCourses.map((course, index) => (
                  <option key={index} value={course}>{course}</option>
                ))
              : formData.department === 'PG'
              ? pgCourses.map((course, index) => (
                  <option key={index} value={course}>{course}</option>
                ))
              : pgResearchCourses.map((course, index) => (
                  <option key={index} value={course}>{course}</option>
                ))}
          </select>
        </div>
        
        {/* Club & Club Logo */}
        <div className="flex items-center space-x-2">
          <input 
            type="text" 
            name="clubName" 
            placeholder="Club Name (Optional)" 
            onChange={handleChange} 
          />
          <label>Club Logo:</label>
          <input 
            type="file" 
            name="clubLogo" 
            onChange={handleFileChange} 
          />
        </div>

        {/* Collaborators Section */}
        <div className="space-y-4">
          <label>Number of Collaborators (Max 2):</label>
          <select 
            value={numCollaborators} 
            onChange={handleNumCollaboratorsChange} 
          >
            <option value={0}>0</option>
            <option value={1}>1</option>
            <option value={2}>2</option>
          </select>
          {collaboratorsData.map((collab, index) => (
            <div key={index} className="border p-4 rounded">
              <h3>Collaborator {index + 1}</h3>
              <input
                type="text"
                placeholder="Name"
                value={collab.name}
                onChange={(e) => handleCollaboratorChange(index, e.target.value)}
              />
              <input
                type="file"
                onChange={(e) => handleCollaboratorLogoChange(index, e.target.files[0])}
              />
            </div>
          ))}
        </div>

        {/* Chief Guests Section */}
        <div className="space-y-4">
          <label>Number of Chief Guests:</label>
          <select 
            value={numChiefGuests} 
            onChange={handleNumChiefGuestsChange} 
          >
            <option value={0}>0</option>
            <option value={1}>1</option>
            <option value={2}>2</option>
            <option value={3}>3</option>
          </select>
          {chiefGuestsData.map((guest, index) => (
            <div key={index} className="border p-4 rounded">
              <h3>Chief Guest {index + 1}</h3>
              <select
                value={guest.salutation}
                onChange={(e) => handleChiefGuestChange(index, 'salutation', e.target.value)}
              >
                <option value="MR.">MR.</option>
                <option value="Mrs.">Mrs.</option>
                <option value="Dr.">Dr.</option>
              </select>
              <input
                type="text"
                placeholder="Name"
                value={guest.name}
                onChange={(e) => handleChiefGuestChange(index, 'name', e.target.value)}
              />
              <input
                type="text"
                placeholder="Designation"
                value={guest.designation}
                onChange={(e) => handleChiefGuestChange(index, 'designation', e.target.value)}
              />
              <input
                type="text"
                placeholder="Additional Text"
                value={guest.additionalText}
                onChange={(e) => handleChiefGuestChange(index, 'additionalText', e.target.value)}
              />
              <input
                type="file"
                onChange={(e) => handleChiefGuestImageChange(index, e.target.files[0])}
              />
            </div>
          ))}
        </div>

        {/* Titles Section */}
        <div className="space-y-4">
          <label>Titles (up to 3):&nbsp;&nbsp;&nbsp;&nbsp;</label>
          {titles.map((title, index) => (
            <div key={index} className="flex items-center space-x-2">
              <input
                type="text"
                placeholder={`Title ${index + 1}`}
                value={title}
                onChange={(e) => handleTitleChange(index, e.target.value)}
              />
              <button type="button" onClick={() => handleRemoveTitle(index)}>
                Remove
              </button>
            </div>
          ))}
          {titles.length < 3 && (
            <button 
              type="button" 
              onClick={handleAddTitle}
            >
              Add Title
            </button>
          )}
        </div>

        {/* Agenda */}
        <div>
          <span style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '8px' }}>
            <label><span>Add Agenda</span></label>
            <input 
              type="checkbox" 
              checked={enableAgenda} 
              onChange={() => setEnableAgenda(!enableAgenda)} 
              style={{ transform: 'scale(0.8)', width: '16px', height: '16px' }} 
            />
          </span>
        </div>

        {enableAgenda && (
          <div className="space-y-2">
            {agendaList.map((agenda, index) => (
              <div key={index} className="flex items-center space-x-2">
                <input
                  type="text"
                  placeholder={`Agenda ${index + 1}`}
                  value={agenda}
                  onChange={(e) => handleAgendaChange(index, e.target.value)}
                />
                <button type="button" onClick={() => handleRemoveAgenda(index)}>
                  Remove
                </button>
              </div>
            ))}
            {agendaList.length < 10 && (
              <button type="button" onClick={handleAddAgenda}>
                Add Agenda
              </button>
            )}
          </div>
        )}

        <button type="submit">
          Generate Certificate
        </button>
      </form>
    </div>
  );
}
