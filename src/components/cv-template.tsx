import type { CVData } from "@/lib/cv-data"

interface CVTemplateProps {
  template: string
  data: CVData
}

export default function CVTemplate({ template, data }: CVTemplateProps) {
  const { personalInfo, experience, education, skills } = data

  if (template === "modern") {
    return (
      <div className="bg-white shadow-lg max-w-4xl mx-auto print:shadow-none">
        <div className="bg-slate-800 text-white p-8">
          <h1 className="text-4xl font-bold mb-2">{personalInfo.fullName || "Tu Nombre"}</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              {personalInfo.email && <p>📧 {personalInfo.email}</p>}
              {personalInfo.phone && <p>📱 {personalInfo.phone}</p>}
            </div>
            <div>
              {personalInfo.address && <p>📍 {personalInfo.address}</p>}
              {personalInfo.linkedin && <p>💼 {personalInfo.linkedin}</p>}
            </div>
          </div>
        </div>

        <div className="p-8">
          {personalInfo.summary && (
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-slate-800 mb-4 border-b-2 border-slate-200 pb-2">
                Resumen Profesional
              </h2>
              <p className="text-gray-700 leading-relaxed">{personalInfo.summary}</p>
            </div>
          )}

          {experience.length > 0 && (
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-slate-800 mb-4 border-b-2 border-slate-200 pb-2">
                Experiencia Laboral
              </h2>
              {experience.map((exp) => (
                <div key={exp.id} className="mb-6">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="text-xl font-semibold text-slate-800">{exp.position}</h3>
                      <p className="text-lg text-slate-600">{exp.company}</p>
                    </div>
                    <p className="text-sm text-gray-500">
                      {exp.startDate} - {exp.current ? "Presente" : exp.endDate}
                    </p>
                  </div>
                  {exp.description && <p className="text-gray-700 leading-relaxed">{exp.description}</p>}
                </div>
              ))}
            </div>
          )}

          {education.length > 0 && (
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-slate-800 mb-4 border-b-2 border-slate-200 pb-2">Educación</h2>
              {education.map((edu) => (
                <div key={edu.id} className="mb-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-lg font-semibold text-slate-800">
                        {edu.degree} en {edu.field}
                      </h3>
                      <p className="text-slate-600">{edu.institution}</p>
                      {edu.gpa && <p className="text-sm text-gray-500">Promedio: {edu.gpa}</p>}
                    </div>
                    <p className="text-sm text-gray-500">
                      {edu.startDate} - {edu.endDate}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}

          {skills.length > 0 && (
            <div>
              <h2 className="text-2xl font-bold text-slate-800 mb-4 border-b-2 border-slate-200 pb-2">Habilidades</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {skills.map((skill) => (
                  <div key={skill.id} className="flex justify-between items-center">
                    <span className="text-slate-700">{skill.name}</span>
                    <span className="text-sm bg-slate-100 px-2 py-1 rounded">{skill.level}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    )
  }

  if (template === "classic") {
    return (
      <div className="bg-white shadow-lg max-w-4xl mx-auto p-8 print:shadow-none">
        <div className="text-center mb-8 border-b-2 border-gray-300 pb-6">
          <h1 className="text-3xl font-bold mb-4">{personalInfo.fullName || "Tu Nombre"}</h1>
          <div className="text-sm text-gray-600 space-y-1">
            {personalInfo.email && <p>{personalInfo.email}</p>}
            {personalInfo.phone && <p>{personalInfo.phone}</p>}
            {personalInfo.address && <p>{personalInfo.address}</p>}
            {personalInfo.linkedin && <p>{personalInfo.linkedin}</p>}
          </div>
        </div>

        {personalInfo.summary && (
          <div className="mb-8">
            <h2 className="text-xl font-bold mb-3 uppercase tracking-wide">Objetivo Profesional</h2>
            <p className="text-gray-700 leading-relaxed">{personalInfo.summary}</p>
          </div>
        )}

        {experience.length > 0 && (
          <div className="mb-8">
            <h2 className="text-xl font-bold mb-3 uppercase tracking-wide">Experiencia Laboral</h2>
            {experience.map((exp) => (
              <div key={exp.id} className="mb-6">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="font-semibold">{exp.position}</h3>
                    <p className="italic">{exp.company}</p>
                  </div>
                  <p className="text-sm">
                    {exp.startDate} - {exp.current ? "Presente" : exp.endDate}
                  </p>
                </div>
                {exp.description && <p className="text-gray-700 text-sm leading-relaxed">{exp.description}</p>}
              </div>
            ))}
          </div>
        )}

        {education.length > 0 && (
          <div className="mb-8">
            <h2 className="text-xl font-bold mb-3 uppercase tracking-wide">Educación</h2>
            {education.map((edu) => (
              <div key={edu.id} className="mb-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold">
                      {edu.degree} en {edu.field}
                    </h3>
                    <p className="italic">{edu.institution}</p>
                    {edu.gpa && <p className="text-sm">Promedio: {edu.gpa}</p>}
                  </div>
                  <p className="text-sm">
                    {edu.startDate} - {edu.endDate}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}

        {skills.length > 0 && (
          <div>
            <h2 className="text-xl font-bold mb-3 uppercase tracking-wide">Habilidades</h2>
            <div className="grid grid-cols-2 gap-2">
              {skills.map((skill) => (
                <div key={skill.id} className="text-sm">
                  <span className="font-medium">{skill.name}</span> - {skill.level}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    )
  }

  if (template === "creative") {
    return (
      <div className="bg-white shadow-lg max-w-4xl mx-auto print:shadow-none">
        <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white p-8">
          <h1 className="text-4xl font-bold mb-4">{personalInfo.fullName || "Tu Nombre"}</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              {personalInfo.email && <p className="flex items-center">📧 {personalInfo.email}</p>}
              {personalInfo.phone && <p className="flex items-center">📱 {personalInfo.phone}</p>}
            </div>
            <div className="space-y-2">
              {personalInfo.address && <p className="flex items-center">📍 {personalInfo.address}</p>}
              {personalInfo.linkedin && <p className="flex items-center">💼 {personalInfo.linkedin}</p>}
            </div>
          </div>
        </div>

        <div className="p-8">
          {personalInfo.summary && (
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-purple-600 mb-4 flex items-center">
                <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center mr-3">✨</div>
                Sobre Mí
              </h2>
              <p className="text-gray-700 leading-relaxed bg-purple-50 p-4 rounded-lg">{personalInfo.summary}</p>
            </div>
          )}

          {experience.length > 0 && (
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-blue-600 mb-4 flex items-center">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3">💼</div>
                Experiencia
              </h2>
              {experience.map((exp) => (
                <div key={exp.id} className="mb-6 bg-blue-50 p-4 rounded-lg">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="text-xl font-semibold text-blue-800">{exp.position}</h3>
                      <p className="text-lg text-blue-600">{exp.company}</p>
                    </div>
                    <span className="bg-blue-200 text-blue-800 px-3 py-1 rounded-full text-sm">
                      {exp.startDate} - {exp.current ? "Presente" : exp.endDate}
                    </span>
                  </div>
                  {exp.description && <p className="text-gray-700 leading-relaxed">{exp.description}</p>}
                </div>
              ))}
            </div>
          )}

          {education.length > 0 && (
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-green-600 mb-4 flex items-center">
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mr-3">🎓</div>
                Educación
              </h2>
              {education.map((edu) => (
                <div key={edu.id} className="mb-4 bg-green-50 p-4 rounded-lg">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-lg font-semibold text-green-800">
                        {edu.degree} en {edu.field}
                      </h3>
                      <p className="text-green-600">{edu.institution}</p>
                      {edu.gpa && <p className="text-sm text-gray-600">Promedio: {edu.gpa}</p>}
                    </div>
                    <span className="bg-green-200 text-green-800 px-3 py-1 rounded-full text-sm">
                      {edu.startDate} - {edu.endDate}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}

          {skills.length > 0 && (
            <div>
              <h2 className="text-2xl font-bold text-orange-600 mb-4 flex items-center">
                <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center mr-3">🚀</div>
                Habilidades
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {skills.map((skill) => (
                  <div key={skill.id} className="bg-orange-50 p-3 rounded-lg">
                    <div className="flex justify-between items-center">
                      <span className="font-medium text-orange-800">{skill.name}</span>
                      <span className="bg-orange-200 text-orange-800 px-2 py-1 rounded text-sm">{skill.level}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    )
  }

  return null
}
