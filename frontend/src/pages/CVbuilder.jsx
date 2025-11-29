<<<<<<< HEAD
import { useState } from 'react';
import { Download, User, Mail, Phone, MapPin, Briefcase, GraduationCap, Award, Plus, X } from 'lucide-react';

const CVBuilder = () => {
  const [cvData, setCvData] = useState({
    personalInfo: {
      fullName: '',
      email: '',
      phone: '',
      location: '',
      summary: ''
    },
    experience: [
      { company: '', position: '', duration: '', description: '' }
    ],
    education: [
      { institution: '', degree: '', year: '', details: '' }
    ],
    skills: [''],
    achievements: [''],
    certificates: [
      { name: '', issuer: '', year: '', description: '' }
    ]
  });

  const updatePersonalInfo = (field, value) => {
    setCvData(prev => ({
      ...prev,
      personalInfo: { ...prev.personalInfo, [field]: value }
    }));
  };

  const updateArrayField = (section, index, field, value) => {
    setCvData(prev => ({
      ...prev,
      [section]: prev[section].map((item, i) => 
        i === index ? { ...item, [field]: value } : item
      )
    }));
  };

  const addArrayItem = (section, template) => {
    setCvData(prev => ({
      ...prev,
      [section]: [...prev[section], template]
    }));
  };

  const removeArrayItem = (section, index) => {
    setCvData(prev => ({
      ...prev,
      [section]: prev[section].filter((_, i) => i !== index)
    }));
  };

  const updateSkillOrAchievement = (section, index, value) => {
    setCvData(prev => ({
      ...prev,
      [section]: prev[section].map((item, i) => i === index ? value : item)
    }));
  };

  const downloadCV = () => {
    const cvElement = document.getElementById('cv-preview');
    const printWindow = window.open('', '_blank');
    printWindow.document.write(`
      <html>
        <head>
          <title>CV - ${cvData.personalInfo.fullName}</title>
          <style>
            body { font-family: Arial, sans-serif; margin: 20px; line-height: 1.6; }
            .cv-container { max-width: 800px; margin: 0 auto; }
            .header { border-bottom: 3px solid #3b82f6; padding-bottom: 20px; margin-bottom: 30px; }
            .name { font-size: 32px; font-weight: bold; color: #1f2937; margin-bottom: 10px; }
            .contact-info { display: flex; flex-wrap: wrap; gap: 20px; color: #6b7280; }
            .section { margin-bottom: 30px; }
            .section-title { font-size: 20px; font-weight: bold; color: #1f2937; border-bottom: 2px solid #e5e7eb; padding-bottom: 5px; margin-bottom: 15px; }
            .experience-item, .education-item { margin-bottom: 20px; }
            .item-title { font-weight: bold; color: #1f2937; }
            .item-subtitle { color: #6b7280; font-style: italic; }
            .item-duration { color: #6b7280; font-size: 14px; }
            .skills-grid { display: flex; flex-wrap: wrap; gap: 10px; }
            .skill-tag { background: #e5e7eb; padding: 5px 10px; border-radius: 5px; font-size: 14px; }
            .achievement { margin-bottom: 10px; }
            @media print { body { margin: 0; } }
          </style>
        </head>
        <body>${cvElement.innerHTML}</body>
      </html>
    `);
    printWindow.document.close();
    printWindow.print();
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold text-gray-800">CV Builder</h1>
            <button
              onClick={downloadCV}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-700 transition-colors"
            >
              <Download size={20} />
              Download CV
            </button>
          </div>
          
          <div className="grid grid-cols-2 gap-6">
            {/* Input Form */}
            <div className="space-y-4 h-screen overflow-y-auto pr-2">
              {/* Personal Information */}
              <div className="bg-gray-50 p-3 rounded-lg">
                <h2 className="text-lg font-semibold mb-3 flex items-center gap-2">
                  <User size={20} />
                  Personal Information
                </h2>
                <div className="space-y-3">
                  <input
                    type="text"
                    placeholder="Full Name"
                    value={cvData.personalInfo.fullName}
                    onChange={(e) => updatePersonalInfo('fullName', e.target.value)}
                    className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                  />
                  <input
                    type="email"
                    placeholder="Email"
                    value={cvData.personalInfo.email}
                    onChange={(e) => updatePersonalInfo('email', e.target.value)}
                    className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                  />
                  <input
                    type="tel"
                    placeholder="Phone"
                    value={cvData.personalInfo.phone}
                    onChange={(e) => updatePersonalInfo('phone', e.target.value)}
                    className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                  />
                  <input
                    type="text"
                    placeholder="Location"
                    value={cvData.personalInfo.location}
                    onChange={(e) => updatePersonalInfo('location', e.target.value)}
                    className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                  />
                  <textarea
                    placeholder="Professional Summary"
                    value={cvData.personalInfo.summary}
                    onChange={(e) => updatePersonalInfo('summary', e.target.value)}
                    rows={3}
                    className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                  />
                </div>
              </div>

              {/* Experience */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-semibold flex items-center gap-2">
                    <Briefcase size={20} />
                    Work Experience
                  </h2>
                  <button
                    onClick={() => addArrayItem('experience', { company: '', position: '', duration: '', description: '' })}
                    className="bg-green-600 text-white p-2 rounded-lg hover:bg-green-700"
                  >
                    <Plus size={16} />
                  </button>
                </div>
                {cvData.experience.map((exp, index) => (
                  <div key={index} className="border p-4 rounded-lg mb-4 bg-white">
                    <div className="flex justify-between items-start mb-3">
                      <h3 className="font-medium">Experience {index + 1}</h3>
                      {cvData.experience.length > 1 && (
                        <button
                          onClick={() => removeArrayItem('experience', index)}
                          className="text-red-600 hover:text-red-800"
                        >
                          <X size={16} />
                        </button>
                      )}
                    </div>
                    <div className="space-y-3">
                      <input
                        type="text"
                        placeholder="Company"
                        value={exp.company}
                        onChange={(e) => updateArrayField('experience', index, 'company', e.target.value)}
                        className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                      <input
                        type="text"
                        placeholder="Position"
                        value={exp.position}
                        onChange={(e) => updateArrayField('experience', index, 'position', e.target.value)}
                        className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                      <input
                        type="text"
                        placeholder="Duration (e.g., Jan 2020 - Dec 2022)"
                        value={exp.duration}
                        onChange={(e) => updateArrayField('experience', index, 'duration', e.target.value)}
                        className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                      <textarea
                        placeholder="Job Description"
                        value={exp.description}
                        onChange={(e) => updateArrayField('experience', index, 'description', e.target.value)}
                        rows={3}
                        className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                  </div>
                ))}
              </div>

              {/* Education */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-semibold flex items-center gap-2">
                    <GraduationCap size={20} />
                    Education
                  </h2>
                  <button
                    onClick={() => addArrayItem('education', { institution: '', degree: '', year: '', details: '' })}
                    className="bg-green-600 text-white p-2 rounded-lg hover:bg-green-700"
                  >
                    <Plus size={16} />
                  </button>
                </div>
                {cvData.education.map((edu, index) => (
                  <div key={index} className="border p-4 rounded-lg mb-4 bg-white">
                    <div className="flex justify-between items-start mb-3">
                      <h3 className="font-medium">Education {index + 1}</h3>
                      {cvData.education.length > 1 && (
                        <button
                          onClick={() => removeArrayItem('education', index)}
                          className="text-red-600 hover:text-red-800"
                        >
                          <X size={16} />
                        </button>
                      )}
                    </div>
                    <div className="space-y-3">
                      <input
                        type="text"
                        placeholder="Institution"
                        value={edu.institution}
                        onChange={(e) => updateArrayField('education', index, 'institution', e.target.value)}
                        className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                      <input
                        type="text"
                        placeholder="Degree"
                        value={edu.degree}
                        onChange={(e) => updateArrayField('education', index, 'degree', e.target.value)}
                        className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                      <input
                        type="text"
                        placeholder="Year"
                        value={edu.year}
                        onChange={(e) => updateArrayField('education', index, 'year', e.target.value)}
                        className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                      <textarea
                        placeholder="Additional Details"
                        value={edu.details}
                        onChange={(e) => updateArrayField('education', index, 'details', e.target.value)}
                        rows={2}
                        className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                  </div>
                ))}
              </div>

              {/* Skills */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-semibold">Skills</h2>
                  <button
                    onClick={() => addArrayItem('skills', '')}
                    className="bg-green-600 text-white p-2 rounded-lg hover:bg-green-700"
                  >
                    <Plus size={16} />
                  </button>
                </div>
                {cvData.skills.map((skill, index) => (
                  <div key={index} className="flex gap-2 mb-3">
                    <input
                      type="text"
                      placeholder="Skill"
                      value={skill}
                      onChange={(e) => updateSkillOrAchievement('skills', index, e.target.value)}
                      className="flex-1 p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    {cvData.skills.length > 1 && (
                      <button
                        onClick={() => removeArrayItem('skills', index)}
                        className="text-red-600 hover:text-red-800 p-2"
                      >
                        <X size={16} />
                      </button>
                    )}
                  </div>
                ))}
              </div>

              {/* Certificates */}
              <div className="bg-gray-50 p-3 rounded-lg">
                <div className="flex justify-between items-center mb-3">
                  <h2 className="text-lg font-semibold flex items-center gap-2">
                    <Award size={20} />
                    Certificates
                  </h2>
                  <button
                    onClick={() => addArrayItem('certificates', { name: '', issuer: '', year: '', description: '' })}
                    className="bg-green-600 text-white p-2 rounded-lg hover:bg-green-700"
                  >
                    <Plus size={16} />
                  </button>
                </div>
                {cvData.certificates.map((cert, index) => (
                  <div key={index} className="border p-3 rounded-lg mb-3 bg-white">
                    <div className="flex justify-between items-start mb-3">
                      <h3 className="font-medium text-sm">Certificate {index + 1}</h3>
                      {cvData.certificates.length > 1 && (
                        <button
                          onClick={() => removeArrayItem('certificates', index)}
                          className="text-red-600 hover:text-red-800"
                        >
                          <X size={16} />
                        </button>
                      )}
                    </div>
                    <div className="space-y-2">
                      <input
                        type="text"
                        placeholder="Certificate Name"
                        value={cert.name}
                        onChange={(e) => updateArrayField('certificates', index, 'name', e.target.value)}
                        className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                      />
                      <input
                        type="text"
                        placeholder="Issuing Organization"
                        value={cert.issuer}
                        onChange={(e) => updateArrayField('certificates', index, 'issuer', e.target.value)}
                        className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                      />
                      <input
                        type="text"
                        placeholder="Year"
                        value={cert.year}
                        onChange={(e) => updateArrayField('certificates', index, 'year', e.target.value)}
                        className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                      />
                      <textarea
                        placeholder="Description (optional)"
                        value={cert.description}
                        onChange={(e) => updateArrayField('certificates', index, 'description', e.target.value)}
                        rows={2}
                        className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                      />
                    </div>
                  </div>
                ))}
              </div>

              {/* Achievements */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-semibold flex items-center gap-2">
                    <Award size={20} />
                    Achievements
                  </h2>
                  <button
                    onClick={() => addArrayItem('achievements', '')}
                    className="bg-green-600 text-white p-2 rounded-lg hover:bg-green-700"
                  >
                    <Plus size={16} />
                  </button>
                </div>
                {cvData.achievements.map((achievement, index) => (
                  <div key={index} className="flex gap-2 mb-3">
                    <input
                      type="text"
                      placeholder="Achievement"
                      value={achievement}
                      onChange={(e) => updateSkillOrAchievement('achievements', index, e.target.value)}
                      className="flex-1 p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    {cvData.achievements.length > 1 && (
                      <button
                        onClick={() => removeArrayItem('achievements', index)}
                        className="text-red-600 hover:text-red-800 p-2"
                      >
                        <X size={16} />
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Live CV Preview */}
            <div className="bg-white border-2 border-gray-200 rounded-lg p-4 h-screen overflow-y-auto">
              <div id="cv-preview" className="cv-container" style={{ transform: 'scale(0.85)', transformOrigin: 'top left', width: '117.6%' }}>
                {/* Header */}
                <div className="header border-b-4 border-blue-600 pb-6 mb-8">
                  <h1 className="name text-4xl font-bold text-gray-800 mb-3">
                    {cvData.personalInfo.fullName || 'Your Name'}
                  </h1>
                  <div className="contact-info flex flex-wrap gap-4 text-gray-600">
                    {cvData.personalInfo.email && (
                      <div className="flex items-center gap-1">
                        <Mail size={16} />
                        <span>{cvData.personalInfo.email}</span>
                      </div>
                    )}
                    {cvData.personalInfo.phone && (
                      <div className="flex items-center gap-1">
                        <Phone size={16} />
                        <span>{cvData.personalInfo.phone}</span>
                      </div>
                    )}
                    {cvData.personalInfo.location && (
                      <div className="flex items-center gap-1">
                        <MapPin size={16} />
                        <span>{cvData.personalInfo.location}</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Summary */}
                {cvData.personalInfo.summary && (
                  <div className="section mb-8">
                    <h2 className="section-title text-xl font-bold text-gray-800 border-b-2 border-gray-200 pb-2 mb-4">
                      Professional Summary
                    </h2>
                    <p className="text-gray-700 leading-relaxed">{cvData.personalInfo.summary}</p>
                  </div>
                )}

                {/* Experience */}
                {cvData.experience.some(exp => exp.company || exp.position) && (
                  <div className="section mb-8">
                    <h2 className="section-title text-xl font-bold text-gray-800 border-b-2 border-gray-200 pb-2 mb-4">
                      Work Experience
                    </h2>
                    {cvData.experience.map((exp, index) => {
                      if (!exp.company && !exp.position) return null;
                      return (
                        <div key={index} className="experience-item mb-6">
                          <div className="item-title text-lg font-semibold text-gray-800">
                            {exp.position} {exp.company && `at ${exp.company}`}
                          </div>
                          {exp.duration && (
                            <div className="item-duration text-gray-600 text-sm mb-2">{exp.duration}</div>
                          )}
                          {exp.description && (
                            <div className="text-gray-700">{exp.description}</div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                )}

                {/* Education */}
                {cvData.education.some(edu => edu.institution || edu.degree) && (
                  <div className="section mb-8">
                    <h2 className="section-title text-xl font-bold text-gray-800 border-b-2 border-gray-200 pb-2 mb-4">
                      Education
                    </h2>
                    {cvData.education.map((edu, index) => {
                      if (!edu.institution && !edu.degree) return null;
                      return (
                        <div key={index} className="education-item mb-6">
                          <div className="item-title text-lg font-semibold text-gray-800">
                            {edu.degree} {edu.institution && `from ${edu.institution}`}
                          </div>
                          {edu.year && (
                            <div className="item-duration text-gray-600 text-sm mb-2">{edu.year}</div>
                          )}
                          {edu.details && (
                            <div className="text-gray-700">{edu.details}</div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                )}

                {/* Skills */}
                {cvData.skills.some(skill => skill.trim()) && (
                  <div className="section mb-8">
                    <h2 className="section-title text-xl font-bold text-gray-800 border-b-2 border-gray-200 pb-2 mb-4">
                      Skills
                    </h2>
                    <div className="skills-grid flex flex-wrap gap-2">
                      {cvData.skills.filter(skill => skill.trim()).map((skill, index) => (
                        <span key={index} className="skill-tag bg-gray-200 px-3 py-1 rounded-full text-sm">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Certificates */}
                {cvData.certificates.some(cert => cert.name || cert.issuer) && (
                  <div className="section mb-8">
                    <h2 className="section-title text-xl font-bold text-gray-800 border-b-2 border-gray-200 pb-2 mb-4">
                      Certificates
                    </h2>
                    {cvData.certificates.map((cert, index) => {
                      if (!cert.name && !cert.issuer) return null;
                      return (
                        <div key={index} className="education-item mb-6">
                          <div className="item-title text-lg font-semibold text-gray-800">
                            {cert.name} {cert.issuer && `- ${cert.issuer}`}
                          </div>
                          {cert.year && (
                            <div className="item-duration text-gray-600 text-sm mb-2">{cert.year}</div>
                          )}
                          {cert.description && (
                            <div className="text-gray-700">{cert.description}</div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                )}

                {/* Achievements */}
                {cvData.achievements.some(achievement => achievement.trim()) && (
                  <div className="section mb-8">
                    <h2 className="section-title text-xl font-bold text-gray-800 border-b-2 border-gray-200 pb-2 mb-4">
                      Achievements
                    </h2>
                    {cvData.achievements.filter(achievement => achievement.trim()).map((achievement, index) => (
                      <div key={index} className="achievement mb-2 text-gray-700">
                        • {achievement}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

=======
import { useState } from 'react';
import { Download, User, Mail, Phone, MapPin, Briefcase, GraduationCap, Award, Plus, X } from 'lucide-react';

const CVBuilder = () => {
  const [cvData, setCvData] = useState({
    personalInfo: {
      fullName: '',
      email: '',
      phone: '',
      location: '',
      summary: ''
    },
    experience: [
      { company: '', position: '', duration: '', description: '' }
    ],
    education: [
      { institution: '', degree: '', year: '', details: '' }
    ],
    skills: [''],
    achievements: [''],
    certificates: [
      { name: '', issuer: '', year: '', description: '' }
    ]
  });

  const updatePersonalInfo = (field, value) => {
    setCvData(prev => ({
      ...prev,
      personalInfo: { ...prev.personalInfo, [field]: value }
    }));
  };

  const updateArrayField = (section, index, field, value) => {
    setCvData(prev => ({
      ...prev,
      [section]: prev[section].map((item, i) => 
        i === index ? { ...item, [field]: value } : item
      )
    }));
  };

  const addArrayItem = (section, template) => {
    setCvData(prev => ({
      ...prev,
      [section]: [...prev[section], template]
    }));
  };

  const removeArrayItem = (section, index) => {
    setCvData(prev => ({
      ...prev,
      [section]: prev[section].filter((_, i) => i !== index)
    }));
  };

  const updateSkillOrAchievement = (section, index, value) => {
    setCvData(prev => ({
      ...prev,
      [section]: prev[section].map((item, i) => i === index ? value : item)
    }));
  };

  const downloadCV = () => {
    const cvElement = document.getElementById('cv-preview');
    const printWindow = window.open('', '_blank');
    printWindow.document.write(`
      <html>
        <head>
          <title>CV - ${cvData.personalInfo.fullName}</title>
          <style>
            body { font-family: Arial, sans-serif; margin: 20px; line-height: 1.6; }
            .cv-container { max-width: 800px; margin: 0 auto; }
            .header { border-bottom: 3px solid #3b82f6; padding-bottom: 20px; margin-bottom: 30px; }
            .name { font-size: 32px; font-weight: bold; color: #1f2937; margin-bottom: 10px; }
            .contact-info { display: flex; flex-wrap: wrap; gap: 20px; color: #6b7280; }
            .section { margin-bottom: 30px; }
            .section-title { font-size: 20px; font-weight: bold; color: #1f2937; border-bottom: 2px solid #e5e7eb; padding-bottom: 5px; margin-bottom: 15px; }
            .experience-item, .education-item { margin-bottom: 20px; }
            .item-title { font-weight: bold; color: #1f2937; }
            .item-subtitle { color: #6b7280; font-style: italic; }
            .item-duration { color: #6b7280; font-size: 14px; }
            .skills-grid { display: flex; flex-wrap: wrap; gap: 10px; }
            .skill-tag { background: #e5e7eb; padding: 5px 10px; border-radius: 5px; font-size: 14px; }
            .achievement { margin-bottom: 10px; }
            @media print { body { margin: 0; } }
          </style>
        </head>
        <body>${cvElement.innerHTML}</body>
      </html>
    `);
    printWindow.document.close();
    printWindow.print();
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold text-gray-800">CV Builder</h1>
            <button
              onClick={downloadCV}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-700 transition-colors"
            >
              <Download size={20} />
              Download CV
            </button>
          </div>
          
          <div className="grid grid-cols-2 gap-6">
            {/* Input Form */}
            <div className="space-y-4 h-screen overflow-y-auto pr-2">
              {/* Personal Information */}
              <div className="bg-gray-50 p-3 rounded-lg">
                <h2 className="text-lg font-semibold mb-3 flex items-center gap-2">
                  <User size={20} />
                  Personal Information
                </h2>
                <div className="space-y-3">
                  <input
                    type="text"
                    placeholder="Full Name"
                    value={cvData.personalInfo.fullName}
                    onChange={(e) => updatePersonalInfo('fullName', e.target.value)}
                    className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                  />
                  <input
                    type="email"
                    placeholder="Email"
                    value={cvData.personalInfo.email}
                    onChange={(e) => updatePersonalInfo('email', e.target.value)}
                    className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                  />
                  <input
                    type="tel"
                    placeholder="Phone"
                    value={cvData.personalInfo.phone}
                    onChange={(e) => updatePersonalInfo('phone', e.target.value)}
                    className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                  />
                  <input
                    type="text"
                    placeholder="Location"
                    value={cvData.personalInfo.location}
                    onChange={(e) => updatePersonalInfo('location', e.target.value)}
                    className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                  />
                  <textarea
                    placeholder="Professional Summary"
                    value={cvData.personalInfo.summary}
                    onChange={(e) => updatePersonalInfo('summary', e.target.value)}
                    rows={3}
                    className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                  />
                </div>
              </div>

              {/* Experience */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-semibold flex items-center gap-2">
                    <Briefcase size={20} />
                    Work Experience
                  </h2>
                  <button
                    onClick={() => addArrayItem('experience', { company: '', position: '', duration: '', description: '' })}
                    className="bg-green-600 text-white p-2 rounded-lg hover:bg-green-700"
                  >
                    <Plus size={16} />
                  </button>
                </div>
                {cvData.experience.map((exp, index) => (
                  <div key={index} className="border p-4 rounded-lg mb-4 bg-white">
                    <div className="flex justify-between items-start mb-3">
                      <h3 className="font-medium">Experience {index + 1}</h3>
                      {cvData.experience.length > 1 && (
                        <button
                          onClick={() => removeArrayItem('experience', index)}
                          className="text-red-600 hover:text-red-800"
                        >
                          <X size={16} />
                        </button>
                      )}
                    </div>
                    <div className="space-y-3">
                      <input
                        type="text"
                        placeholder="Company"
                        value={exp.company}
                        onChange={(e) => updateArrayField('experience', index, 'company', e.target.value)}
                        className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                      <input
                        type="text"
                        placeholder="Position"
                        value={exp.position}
                        onChange={(e) => updateArrayField('experience', index, 'position', e.target.value)}
                        className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                      <input
                        type="text"
                        placeholder="Duration (e.g., Jan 2020 - Dec 2022)"
                        value={exp.duration}
                        onChange={(e) => updateArrayField('experience', index, 'duration', e.target.value)}
                        className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                      <textarea
                        placeholder="Job Description"
                        value={exp.description}
                        onChange={(e) => updateArrayField('experience', index, 'description', e.target.value)}
                        rows={3}
                        className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                  </div>
                ))}
              </div>

              {/* Education */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-semibold flex items-center gap-2">
                    <GraduationCap size={20} />
                    Education
                  </h2>
                  <button
                    onClick={() => addArrayItem('education', { institution: '', degree: '', year: '', details: '' })}
                    className="bg-green-600 text-white p-2 rounded-lg hover:bg-green-700"
                  >
                    <Plus size={16} />
                  </button>
                </div>
                {cvData.education.map((edu, index) => (
                  <div key={index} className="border p-4 rounded-lg mb-4 bg-white">
                    <div className="flex justify-between items-start mb-3">
                      <h3 className="font-medium">Education {index + 1}</h3>
                      {cvData.education.length > 1 && (
                        <button
                          onClick={() => removeArrayItem('education', index)}
                          className="text-red-600 hover:text-red-800"
                        >
                          <X size={16} />
                        </button>
                      )}
                    </div>
                    <div className="space-y-3">
                      <input
                        type="text"
                        placeholder="Institution"
                        value={edu.institution}
                        onChange={(e) => updateArrayField('education', index, 'institution', e.target.value)}
                        className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                      <input
                        type="text"
                        placeholder="Degree"
                        value={edu.degree}
                        onChange={(e) => updateArrayField('education', index, 'degree', e.target.value)}
                        className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                      <input
                        type="text"
                        placeholder="Year"
                        value={edu.year}
                        onChange={(e) => updateArrayField('education', index, 'year', e.target.value)}
                        className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                      <textarea
                        placeholder="Additional Details"
                        value={edu.details}
                        onChange={(e) => updateArrayField('education', index, 'details', e.target.value)}
                        rows={2}
                        className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                  </div>
                ))}
              </div>

              {/* Skills */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-semibold">Skills</h2>
                  <button
                    onClick={() => addArrayItem('skills', '')}
                    className="bg-green-600 text-white p-2 rounded-lg hover:bg-green-700"
                  >
                    <Plus size={16} />
                  </button>
                </div>
                {cvData.skills.map((skill, index) => (
                  <div key={index} className="flex gap-2 mb-3">
                    <input
                      type="text"
                      placeholder="Skill"
                      value={skill}
                      onChange={(e) => updateSkillOrAchievement('skills', index, e.target.value)}
                      className="flex-1 p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    {cvData.skills.length > 1 && (
                      <button
                        onClick={() => removeArrayItem('skills', index)}
                        className="text-red-600 hover:text-red-800 p-2"
                      >
                        <X size={16} />
                      </button>
                    )}
                  </div>
                ))}
              </div>

              {/* Certificates */}
              <div className="bg-gray-50 p-3 rounded-lg">
                <div className="flex justify-between items-center mb-3">
                  <h2 className="text-lg font-semibold flex items-center gap-2">
                    <Award size={20} />
                    Certificates
                  </h2>
                  <button
                    onClick={() => addArrayItem('certificates', { name: '', issuer: '', year: '', description: '' })}
                    className="bg-green-600 text-white p-2 rounded-lg hover:bg-green-700"
                  >
                    <Plus size={16} />
                  </button>
                </div>
                {cvData.certificates.map((cert, index) => (
                  <div key={index} className="border p-3 rounded-lg mb-3 bg-white">
                    <div className="flex justify-between items-start mb-3">
                      <h3 className="font-medium text-sm">Certificate {index + 1}</h3>
                      {cvData.certificates.length > 1 && (
                        <button
                          onClick={() => removeArrayItem('certificates', index)}
                          className="text-red-600 hover:text-red-800"
                        >
                          <X size={16} />
                        </button>
                      )}
                    </div>
                    <div className="space-y-2">
                      <input
                        type="text"
                        placeholder="Certificate Name"
                        value={cert.name}
                        onChange={(e) => updateArrayField('certificates', index, 'name', e.target.value)}
                        className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                      />
                      <input
                        type="text"
                        placeholder="Issuing Organization"
                        value={cert.issuer}
                        onChange={(e) => updateArrayField('certificates', index, 'issuer', e.target.value)}
                        className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                      />
                      <input
                        type="text"
                        placeholder="Year"
                        value={cert.year}
                        onChange={(e) => updateArrayField('certificates', index, 'year', e.target.value)}
                        className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                      />
                      <textarea
                        placeholder="Description (optional)"
                        value={cert.description}
                        onChange={(e) => updateArrayField('certificates', index, 'description', e.target.value)}
                        rows={2}
                        className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                      />
                    </div>
                  </div>
                ))}
              </div>

              {/* Achievements */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-semibold flex items-center gap-2">
                    <Award size={20} />
                    Achievements
                  </h2>
                  <button
                    onClick={() => addArrayItem('achievements', '')}
                    className="bg-green-600 text-white p-2 rounded-lg hover:bg-green-700"
                  >
                    <Plus size={16} />
                  </button>
                </div>
                {cvData.achievements.map((achievement, index) => (
                  <div key={index} className="flex gap-2 mb-3">
                    <input
                      type="text"
                      placeholder="Achievement"
                      value={achievement}
                      onChange={(e) => updateSkillOrAchievement('achievements', index, e.target.value)}
                      className="flex-1 p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    {cvData.achievements.length > 1 && (
                      <button
                        onClick={() => removeArrayItem('achievements', index)}
                        className="text-red-600 hover:text-red-800 p-2"
                      >
                        <X size={16} />
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Live CV Preview */}
            <div className="bg-white border-2 border-gray-200 rounded-lg p-4 h-screen overflow-y-auto">
              <div id="cv-preview" className="cv-container" style={{ transform: 'scale(0.85)', transformOrigin: 'top left', width: '117.6%' }}>
                {/* Header */}
                <div className="header border-b-4 border-blue-600 pb-6 mb-8">
                  <h1 className="name text-4xl font-bold text-gray-800 mb-3">
                    {cvData.personalInfo.fullName || 'Your Name'}
                  </h1>
                  <div className="contact-info flex flex-wrap gap-4 text-gray-600">
                    {cvData.personalInfo.email && (
                      <div className="flex items-center gap-1">
                        <Mail size={16} />
                        <span>{cvData.personalInfo.email}</span>
                      </div>
                    )}
                    {cvData.personalInfo.phone && (
                      <div className="flex items-center gap-1">
                        <Phone size={16} />
                        <span>{cvData.personalInfo.phone}</span>
                      </div>
                    )}
                    {cvData.personalInfo.location && (
                      <div className="flex items-center gap-1">
                        <MapPin size={16} />
                        <span>{cvData.personalInfo.location}</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Summary */}
                {cvData.personalInfo.summary && (
                  <div className="section mb-8">
                    <h2 className="section-title text-xl font-bold text-gray-800 border-b-2 border-gray-200 pb-2 mb-4">
                      Professional Summary
                    </h2>
                    <p className="text-gray-700 leading-relaxed">{cvData.personalInfo.summary}</p>
                  </div>
                )}

                {/* Experience */}
                {cvData.experience.some(exp => exp.company || exp.position) && (
                  <div className="section mb-8">
                    <h2 className="section-title text-xl font-bold text-gray-800 border-b-2 border-gray-200 pb-2 mb-4">
                      Work Experience
                    </h2>
                    {cvData.experience.map((exp, index) => {
                      if (!exp.company && !exp.position) return null;
                      return (
                        <div key={index} className="experience-item mb-6">
                          <div className="item-title text-lg font-semibold text-gray-800">
                            {exp.position} {exp.company && `at ${exp.company}`}
                          </div>
                          {exp.duration && (
                            <div className="item-duration text-gray-600 text-sm mb-2">{exp.duration}</div>
                          )}
                          {exp.description && (
                            <div className="text-gray-700">{exp.description}</div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                )}

                {/* Education */}
                {cvData.education.some(edu => edu.institution || edu.degree) && (
                  <div className="section mb-8">
                    <h2 className="section-title text-xl font-bold text-gray-800 border-b-2 border-gray-200 pb-2 mb-4">
                      Education
                    </h2>
                    {cvData.education.map((edu, index) => {
                      if (!edu.institution && !edu.degree) return null;
                      return (
                        <div key={index} className="education-item mb-6">
                          <div className="item-title text-lg font-semibold text-gray-800">
                            {edu.degree} {edu.institution && `from ${edu.institution}`}
                          </div>
                          {edu.year && (
                            <div className="item-duration text-gray-600 text-sm mb-2">{edu.year}</div>
                          )}
                          {edu.details && (
                            <div className="text-gray-700">{edu.details}</div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                )}

                {/* Skills */}
                {cvData.skills.some(skill => skill.trim()) && (
                  <div className="section mb-8">
                    <h2 className="section-title text-xl font-bold text-gray-800 border-b-2 border-gray-200 pb-2 mb-4">
                      Skills
                    </h2>
                    <div className="skills-grid flex flex-wrap gap-2">
                      {cvData.skills.filter(skill => skill.trim()).map((skill, index) => (
                        <span key={index} className="skill-tag bg-gray-200 px-3 py-1 rounded-full text-sm">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Certificates */}
                {cvData.certificates.some(cert => cert.name || cert.issuer) && (
                  <div className="section mb-8">
                    <h2 className="section-title text-xl font-bold text-gray-800 border-b-2 border-gray-200 pb-2 mb-4">
                      Certificates
                    </h2>
                    {cvData.certificates.map((cert, index) => {
                      if (!cert.name && !cert.issuer) return null;
                      return (
                        <div key={index} className="education-item mb-6">
                          <div className="item-title text-lg font-semibold text-gray-800">
                            {cert.name} {cert.issuer && `- ${cert.issuer}`}
                          </div>
                          {cert.year && (
                            <div className="item-duration text-gray-600 text-sm mb-2">{cert.year}</div>
                          )}
                          {cert.description && (
                            <div className="text-gray-700">{cert.description}</div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                )}

                {/* Achievements */}
                {cvData.achievements.some(achievement => achievement.trim()) && (
                  <div className="section mb-8">
                    <h2 className="section-title text-xl font-bold text-gray-800 border-b-2 border-gray-200 pb-2 mb-4">
                      Achievements
                    </h2>
                    {cvData.achievements.filter(achievement => achievement.trim()).map((achievement, index) => (
                      <div key={index} className="achievement mb-2 text-gray-700">
                        • {achievement}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

>>>>>>> e12a0af6194ec1fccde5c37358c4afa1d2864623
export default CVBuilder;