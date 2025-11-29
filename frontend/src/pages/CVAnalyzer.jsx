<<<<<<< HEAD
import { useState } from 'react';
import axios from 'axios';
import { useDropzone } from 'react-dropzone';
import { Upload, FileText, Brain, TrendingUp } from 'lucide-react';

const CVAnalyzer = () => {
  const [file, setFile] = useState(null);
  const [analysis, setAnalysis] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const onDrop = (acceptedFiles) => {
    setFile(acceptedFiles[0]);
    setError('');
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'application/pdf': ['.pdf'] },
    maxFiles: 1
  });

  const analyzeCV = async () => {
    if (!file) return setError('Please select a file first');

    setLoading(true);
    setError('');

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await axios.post('http://localhost:5000/api/analyze', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setAnalysis(response.data.analysis);
    } catch (err) {
      setError(err.response?.data?.error || 'Analysis failed');
    } finally {
      setLoading(false);
    }
  };

  const AnalysisResults = ({ analysis }) => (
    <div className="mt-8 space-y-6">

      {/* Contact Information */}
      <div className="bg-blue-50 p-4 rounded-lg">
        <h3 className="text-lg font-semibold mb-2 flex items-center gap-2">
          <FileText size={20} />
          Contact Information
        </h3>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm font-medium">Emails:</p>
            <p className="text-sm text-gray-600">
              {analysis.contact_info?.emails?.length > 0
                ? analysis.contact_info.emails.join(', ')
                : 'None found'}
            </p>
          </div>
          <div>
            <p className="text-sm font-medium">Phones:</p>
            <p className="text-sm text-gray-600">
              {analysis.contact_info?.phones?.length > 0
                ? analysis.contact_info.phones.join(', ')
                : 'None found'}
            </p>
          </div>
        </div>
      </div>

      {/* Skills */}
      <div className="bg-green-50 p-4 rounded-lg">
        <h3 className="text-lg font-semibold mb-2 flex items-center gap-2">
          <Brain size={20} />
          Skills
        </h3>
        <div className="flex flex-wrap gap-2">
          {analysis.skills?.length > 0 ? (
            analysis.skills.map((s, i) => (
              <span key={i} className="bg-green-200 px-2 py-1 rounded-full text-xs">{s}</span>
            ))
          ) : (
            <p className="text-sm text-gray-600">No skills detected</p>
          )}
        </div>
      </div>

      {/* Experience */}
      <div className="bg-yellow-50 p-4 rounded-lg">
        <h3 className="text-lg font-semibold mb-2 flex items-center gap-2">
          <TrendingUp size={20} />
          Experience
        </h3>
        <p className="text-sm text-gray-600">
          {analysis.experience?.length > 0 ? analysis.experience.join(', ') : 'No experience detected'}
        </p>
      </div>

      {/* Sentiment */}
      <div className="bg-purple-50 p-4 rounded-lg">
        <h3 className="text-lg font-semibold mb-2">Sentiment</h3>
        <div className="grid grid-cols-3 gap-4">
          <div>
            <p className="text-sm font-medium">Tone:</p>
            <p className="text-sm text-gray-600">{analysis.sentiment?.interpretation}</p>
          </div>
          <div>
            <p className="text-sm font-medium">Polarity:</p>
            <p className="text-sm text-gray-600">{analysis.sentiment?.polarity}</p>
          </div>
          <div>
            <p className="text-sm font-medium">Subjectivity:</p>
            <p className="text-sm text-gray-600">{analysis.sentiment?.subjectivity}</p>
          </div>
        </div>
      </div>

      {/* Key Phrases */}
      <div className="bg-gray-50 p-4 rounded-lg">
        <h3 className="text-lg font-semibold mb-2">Key Phrases</h3>
        <div className="flex flex-wrap gap-2">
          {analysis.key_phrases?.length > 0 ? (
            analysis.key_phrases.map((phrase, index) => (
              <span key={index} className="bg-gray-200 px-3 py-1 rounded-full text-sm">
                {phrase}
              </span>
            ))
          ) : (
            <p className="text-sm text-gray-600">No key phrases found</p>
          )}
        </div>
      </div>

      {/* Document Stats */}
      <div className="bg-indigo-50 p-4 rounded-lg">
        <h3 className="text-lg font-semibold mb-2">Document Statistics</h3>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm font-medium">Word Count:</p>
            <p className="text-sm text-gray-600">{analysis.word_count}</p>
          </div>
          <div>
            <p className="text-sm font-medium">Character Count:</p>
            <p className="text-sm text-gray-600">{analysis.character_count}</p>
          </div>
        </div>
      </div>

      {/* All Text */}
      <div className="bg-gray-200 p-4 rounded-lg">
        <h3 className="text-lg font-semibold mb-2">Extracted Text</h3>
        <p className="text-sm text-gray-600 whitespace-pre-wrap">{analysis.all_text}</p>
      </div>
    </div>
  );

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-center mb-8">CV Analysis with NLP</h1>

      <div
        {...getRootProps()}
        className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
          isDragActive ? 'border-blue-400 bg-blue-50' : 'border-gray-300 hover:border-gray-400'
        }`}
      >
        <input {...getInputProps()} />
        <Upload size={48} className="mx-auto mb-4 text-gray-400" />
        {file ? (
          <div>
            <p className="text-lg font-medium">{file.name}</p>
            <p className="text-sm text-gray-500">Click Analyze to process</p>
          </div>
        ) : (
          <div>
            <p className="text-lg">Drag & drop your CV here, or click to select</p>
            <p className="text-sm text-gray-500">Supports PDF only</p>
          </div>
        )}
      </div>

      {error && (
        <div className="mt-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded">{error}</div>
      )}

      <div className="mt-6 text-center">
        <button
          onClick={analyzeCV}
          disabled={!file || loading}
          className={`px-6 py-3 rounded-lg font-medium ${
            !file || loading
              ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
              : 'bg-blue-600 text-white hover:bg-blue-700'
          }`}
        >
          {loading ? 'Analyzing...' : 'Analyze CV'}
        </button>
      </div>

      {analysis && <AnalysisResults analysis={analysis} />}
    </div>
  );
};

export default CVAnalyzer;
=======
import { useState } from 'react';
import axios from 'axios';
import { useDropzone } from 'react-dropzone';
import { Upload, FileText, Brain, TrendingUp } from 'lucide-react';

const CVAnalyzer = () => {
  const [file, setFile] = useState(null);
  const [analysis, setAnalysis] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const onDrop = (acceptedFiles) => {
    setFile(acceptedFiles[0]);
    setError('');
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'application/pdf': ['.pdf'] },
    maxFiles: 1
  });

  const analyzeCV = async () => {
    if (!file) return setError('Please select a file first');

    setLoading(true);
    setError('');

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await axios.post('http://localhost:5000/api/analyze', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setAnalysis(response.data.analysis);
    } catch (err) {
      setError(err.response?.data?.error || 'Analysis failed');
    } finally {
      setLoading(false);
    }
  };

  const AnalysisResults = ({ analysis }) => (
    <div className="mt-8 space-y-6">

      {/* Contact Information */}
      <div className="bg-blue-50 p-4 rounded-lg">
        <h3 className="text-lg font-semibold mb-2 flex items-center gap-2">
          <FileText size={20} />
          Contact Information
        </h3>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm font-medium">Emails:</p>
            <p className="text-sm text-gray-600">
              {analysis.contact_info?.emails?.length > 0
                ? analysis.contact_info.emails.join(', ')
                : 'None found'}
            </p>
          </div>
          <div>
            <p className="text-sm font-medium">Phones:</p>
            <p className="text-sm text-gray-600">
              {analysis.contact_info?.phones?.length > 0
                ? analysis.contact_info.phones.join(', ')
                : 'None found'}
            </p>
          </div>
        </div>
      </div>

      {/* Skills */}
      <div className="bg-green-50 p-4 rounded-lg">
        <h3 className="text-lg font-semibold mb-2 flex items-center gap-2">
          <Brain size={20} />
          Skills
        </h3>
        <div className="flex flex-wrap gap-2">
          {analysis.skills?.length > 0 ? (
            analysis.skills.map((s, i) => (
              <span key={i} className="bg-green-200 px-2 py-1 rounded-full text-xs">{s}</span>
            ))
          ) : (
            <p className="text-sm text-gray-600">No skills detected</p>
          )}
        </div>
      </div>

      {/* Experience */}
      <div className="bg-yellow-50 p-4 rounded-lg">
        <h3 className="text-lg font-semibold mb-2 flex items-center gap-2">
          <TrendingUp size={20} />
          Experience
        </h3>
        <p className="text-sm text-gray-600">
          {analysis.experience?.length > 0 ? analysis.experience.join(', ') : 'No experience detected'}
        </p>
      </div>

      {/* Sentiment */}
      <div className="bg-purple-50 p-4 rounded-lg">
        <h3 className="text-lg font-semibold mb-2">Sentiment</h3>
        <div className="grid grid-cols-3 gap-4">
          <div>
            <p className="text-sm font-medium">Tone:</p>
            <p className="text-sm text-gray-600">{analysis.sentiment?.interpretation}</p>
          </div>
          <div>
            <p className="text-sm font-medium">Polarity:</p>
            <p className="text-sm text-gray-600">{analysis.sentiment?.polarity}</p>
          </div>
          <div>
            <p className="text-sm font-medium">Subjectivity:</p>
            <p className="text-sm text-gray-600">{analysis.sentiment?.subjectivity}</p>
          </div>
        </div>
      </div>

      {/* Key Phrases */}
      <div className="bg-gray-50 p-4 rounded-lg">
        <h3 className="text-lg font-semibold mb-2">Key Phrases</h3>
        <div className="flex flex-wrap gap-2">
          {analysis.key_phrases?.length > 0 ? (
            analysis.key_phrases.map((phrase, index) => (
              <span key={index} className="bg-gray-200 px-3 py-1 rounded-full text-sm">
                {phrase}
              </span>
            ))
          ) : (
            <p className="text-sm text-gray-600">No key phrases found</p>
          )}
        </div>
      </div>

      {/* Document Stats */}
      <div className="bg-indigo-50 p-4 rounded-lg">
        <h3 className="text-lg font-semibold mb-2">Document Statistics</h3>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm font-medium">Word Count:</p>
            <p className="text-sm text-gray-600">{analysis.word_count}</p>
          </div>
          <div>
            <p className="text-sm font-medium">Character Count:</p>
            <p className="text-sm text-gray-600">{analysis.character_count}</p>
          </div>
        </div>
      </div>

      {/* All Text */}
      <div className="bg-gray-200 p-4 rounded-lg">
        <h3 className="text-lg font-semibold mb-2">Extracted Text</h3>
        <p className="text-sm text-gray-600 whitespace-pre-wrap">{analysis.all_text}</p>
      </div>
    </div>
  );

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-center mb-8">CV Analysis with NLP</h1>

      <div
        {...getRootProps()}
        className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
          isDragActive ? 'border-blue-400 bg-blue-50' : 'border-gray-300 hover:border-gray-400'
        }`}
      >
        <input {...getInputProps()} />
        <Upload size={48} className="mx-auto mb-4 text-gray-400" />
        {file ? (
          <div>
            <p className="text-lg font-medium">{file.name}</p>
            <p className="text-sm text-gray-500">Click Analyze to process</p>
          </div>
        ) : (
          <div>
            <p className="text-lg">Drag & drop your CV here, or click to select</p>
            <p className="text-sm text-gray-500">Supports PDF only</p>
          </div>
        )}
      </div>

      {error && (
        <div className="mt-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded">{error}</div>
      )}

      <div className="mt-6 text-center">
        <button
          onClick={analyzeCV}
          disabled={!file || loading}
          className={`px-6 py-3 rounded-lg font-medium ${
            !file || loading
              ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
              : 'bg-blue-600 text-white hover:bg-blue-700'
          }`}
        >
          {loading ? 'Analyzing...' : 'Analyze CV'}
        </button>
      </div>

      {analysis && <AnalysisResults analysis={analysis} />}
    </div>
  );
};

export default CVAnalyzer;
>>>>>>> e12a0af6194ec1fccde5c37358c4afa1d2864623
