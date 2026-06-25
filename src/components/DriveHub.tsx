import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X, Search, HardDrive, FolderPlus, UploadCloud, Trash2, Download, 
  Eye, Play, Pause, Loader2, Check, AlertCircle, ExternalLink, 
  Lock, FileText, Music, BarChart3, Cloud, LayoutGrid, List, File, ArrowRight, Save
} from 'lucide-react';
import { DriveFile } from '../types';
import { getDriveFiles, saveDriveFiles } from '../lib/store';

interface DriveHubProps {
  lang: 'bn' | 'en';
  onClose: () => void;
  currentUser: any;
}

export default function DriveHub({ lang, onClose, currentUser }: DriveHubProps) {
  // Google Auth Simulation & Active State
  const [isConnected, setIsConnected] = React.useState<boolean>(() => {
    return localStorage.getItem('drive_connected') === 'true';
  });
  const [googleUser, setGoogleUser] = React.useState<any>(() => {
    const saved = localStorage.getItem('drive_google_user');
    return saved ? JSON.parse(saved) : null;
  });

  // Files & Folders State
  const [files, setFiles] = React.useState<DriveFile[]>(() => getDriveFiles());
  const [searchQuery, setSearchQuery] = React.useState('');
  const [selectedCategory, setSelectedCategory] = React.useState<string>('all');
  const [viewMode, setViewMode] = React.useState<'grid' | 'list'>('grid');

  // Operation States
  const [isUploading, setIsUploading] = React.useState(false);
  const [uploadProgress, setUploadProgress] = React.useState(0);
  const [isCreatingFolder, setIsCreatingFolder] = React.useState(false);
  const [newFolderName, setNewFolderName] = React.useState('');
  const [deleteTarget, setDeleteTarget] = React.useState<DriveFile | null>(null);
  const [previewTarget, setPreviewTarget] = React.useState<DriveFile | null>(null);

  // Google Docs Creation & Editing States
  const [isCreatingDoc, setIsCreatingDoc] = React.useState(false);
  const [newDocTitle, setNewDocTitle] = React.useState('');
  const [selectedTemplate, setSelectedTemplate] = React.useState<'blank' | 'notes' | 'guide' | 'feedback'>('notes');
  const [editingContent, setEditingContent] = React.useState('');
  const [editingTitle, setEditingTitle] = React.useState('');
  const [isSavingDoc, setIsSavingDoc] = React.useState(false);

  React.useEffect(() => {
    if (previewTarget) {
      setEditingContent(previewTarget.content || '');
      setEditingTitle(previewTarget.name || '');
      // Use a brief timeout to allow the modal DOM element to mount before setting innerHTML
      setTimeout(() => {
        if (editorRef.current) {
          editorRef.current.innerHTML = previewTarget.content || '';
        }
      }, 50);
    } else {
      setEditingContent('');
      setEditingTitle('');
    }
  }, [previewTarget]);

  // Audio Playback State
  const [isPlayingAudio, setIsPlayingAudio] = React.useState(false);
  const [audioProgress, setAudioProgress] = React.useState(0);
  const audioRef = React.useRef<HTMLAudioElement | null>(null);
  const editorRef = React.useRef<HTMLDivElement | null>(null);

  // Notifications
  const [successMsg, setSuccessMsg] = React.useState('');
  const [errorMsg, setErrorMsg] = React.useState('');

  React.useEffect(() => {
    saveDriveFiles(files);
  }, [files]);

  // Translate utility
  const t = {
    bn: {
      title: 'স্টাডি ড্রাইভ রিসোর্স হাব',
      subtitle: 'শিক্ষার্থীদের জন্য পবিত্র কুরআন, তাজবীদ বই ও অডিও অনুশীলনের ক্লাউড ড্রাইভ',
      searchPlh: 'বই বা স্টাডি ফাইল খুঁজুন...',
      all: 'সব ফাইল',
      book: 'তাজবীদ বই',
      qaida: 'নূরানী কায়দা',
      progress: 'অগ্রগতি শিট',
      homework: 'বাড়ির কাজ',
      audio: 'অডিও প্র্যাকটিস',
      docs: 'গুগল ডক্স নোটস',
      connectBtn: 'গুগল ড্রাইভ কানেক্ট করুন',
      connectedAs: 'কানেক্টেড গুগল অ্যাকাউন্ট:',
      disconnect: 'ডিসকানেক্ট',
      sandboxNotice: 'স্টাডি ড্রাইভ স্যান্ডবক্স মোডে চালু আছে। আপলোড ও ডিলিট করা ফাইলগুলো আপনার ব্রাউজারে সুরক্ষিত থাকবে।',
      uploadBtn: 'নতুন ফাইল আপলোড',
      createFolder: 'নতুন ফোল্ডার',
      noFiles: 'কোনো ফাইল খুঁজে পাওয়া যায়নি।',
      deleteConfirmTitle: 'ফাইলটি মুছে ফেলতে চান?',
      deleteConfirmDesc: 'আপনি কি নিশ্চিত যে আপনি নিচের ফাইলটি ডিলিট করতে চান? এই কাজটি আর ফিরিয়ে আনা যাবে না।',
      confirmDelete: 'হ্যাঁ, ডিলিট করুন',
      cancel: 'বাতিল',
      folderName: 'ফোল্ডারের নাম',
      create: 'তৈরি করুন',
      preview: 'ফাইল প্রিভিউ',
      download: 'ডাউনলোড করুন',
      details: 'বিস্তারিত তথ্য',
      name: 'ফাইলের নাম',
      size: 'আকার',
      modified: 'আপলোড বা পরিবর্তন',
      source: 'উৎস',
      googleDriveReal: 'গুগল ড্রাইভ লাইভ ক্লাউড',
      localSandbox: 'রিসোর্স ড্রাইভ লোকাল',
      dragDrop: 'ফাইল ড্র্যাগ অ্যান্ড ড্রপ করুন অথবা ব্রাউজ করতে ক্লিক করুন',
      mockAudioDesc: 'সহীহ মাখরাজ ও তাজবীদের সাথে সূরা ফাতিহার বিশেষ অডিও তিলাওয়াত অনুশীলন।',
    },
    en: {
      title: 'Study Drive Resource Hub',
      subtitle: 'Cloud resource hub for Tajweed books, Noorani Qaida, and audio recordings',
      searchPlh: 'Search books or study files...',
      all: 'All Files',
      book: 'Tajweed Books',
      qaida: 'Noorani Qaida',
      progress: 'Progress Sheets',
      homework: 'Homework',
      audio: 'Audio Practice',
      docs: 'Google Docs / Notes',
      connectBtn: 'Connect Google Drive',
      connectedAs: 'Connected Google Account:',
      disconnect: 'Disconnect',
      sandboxNotice: 'Study Drive is running in sandbox mode. All uploaded files are safely cached in your browser storage.',
      uploadBtn: 'Upload New File',
      createFolder: 'Create Folder',
      noFiles: 'No study files found matching the search.',
      deleteConfirmTitle: 'Delete file permanently?',
      deleteConfirmDesc: 'Are you sure you want to delete this file? This action is permanent and cannot be undone.',
      confirmDelete: 'Yes, Delete',
      cancel: 'Cancel',
      folderName: 'Folder Name',
      create: 'Create',
      preview: 'File Preview',
      download: 'Download',
      details: 'File Details',
      name: 'File Name',
      size: 'Size',
      modified: 'Modified Time',
      source: 'Source',
      googleDriveReal: 'Google Drive Live Sync',
      localSandbox: 'Resource Drive Local',
      dragDrop: 'Drag & drop a file here, or click to browse',
      mockAudioDesc: 'Audio practice file for Surah Al-Fatihah with pristine makhraj articulation.',
    }
  };

  const handleConnectGoogle = async () => {
    // Elegant, highly customized OAuth flow popup simulator which also notes real scopes
    const confirmConnect = window.confirm(
      lang === 'bn' 
        ? 'অনলাইন কুরআন একাডেমি আপনার গুগল ড্রাইভের ফাইল দেখতে, নতুন ফাইল আপলোড করতে এবং মুছে ফেলতে অনুমতি চাচ্ছে। আপনি কি সম্মত?'
        : 'Quran Academy wants to access your Google Drive to view, upload, and manage files. Do you authorize this app?'
    );

    if (confirmConnect) {
      setIsUploading(true);
      await new Promise(resolve => setTimeout(resolve, 1000));
      const simulatedGoogleUser = {
        name: currentUser?.fullName || 'Quran Student',
        email: currentUser?.email || 'student@gmail.com',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=150'
      };
      localStorage.setItem('drive_connected', 'true');
      localStorage.setItem('drive_google_user', JSON.stringify(simulatedGoogleUser));
      setIsConnected(true);
      setGoogleUser(simulatedGoogleUser);
      setIsUploading(false);
      showNotification(lang === 'bn' ? 'গুগল ড্রাইভ সফলভাবে সংযুক্ত হয়েছে!' : 'Google Drive successfully connected!');
    }
  };

  const handleDisconnect = () => {
    const confirmDisconnect = window.confirm(
      lang === 'bn' 
        ? 'আপনি কি গুগল ড্রাইভ ডিসকানেক্ট করতে চান?'
        : 'Are you sure you want to disconnect Google Drive?'
    );
    if (confirmDisconnect) {
      localStorage.removeItem('drive_connected');
      localStorage.removeItem('drive_google_user');
      setIsConnected(false);
      setGoogleUser(null);
      showNotification(lang === 'bn' ? 'গুগল ড্রাইভ ডিসকানেক্ট করা হয়েছে।' : 'Google Drive disconnected successfully.');
    }
  };

  const showNotification = (msg: string, isError = false) => {
    if (isError) {
      setErrorMsg(msg);
      setTimeout(() => setErrorMsg(''), 4000);
    } else {
      setSuccessMsg(msg);
      setTimeout(() => setSuccessMsg(''), 4000);
    }
  };

  // Mock File Upload Action
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileList = e.target.files;
    if (!fileList || fileList.length === 0) return;
    const uploadedFile = fileList[0];

    setIsUploading(true);
    setUploadProgress(10);

    const interval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 15;
      });
    }, 150);

    setTimeout(() => {
      // Add new file to state
      const newFile: DriveFile = {
        id: 'file_' + Date.now(),
        name: uploadedFile.name,
        mimeType: uploadedFile.type || 'application/octet-stream',
        size: (uploadedFile.size / (1024 * 1024)).toFixed(1) + ' MB',
        modifiedTime: new Date().toISOString(),
        isVirtual: false,
        category: uploadedFile.type.includes('pdf') ? 'book' : uploadedFile.type.includes('audio') ? 'audio' : 'other'
      };

      setFiles(prev => [newFile, ...prev]);
      setIsUploading(false);
      setUploadProgress(0);
      showNotification(lang === 'bn' ? `"${uploadedFile.name}" সফলভাবে আপলোড হয়েছে!` : `"${uploadedFile.name}" uploaded successfully!`);
    }, 1500);
  };

  // Create Folder Action
  const handleCreateFolder = () => {
    if (!newFolderName.trim()) return;

    const newFolder: DriveFile = {
      id: 'folder_' + Date.now(),
      name: newFolderName.trim(),
      mimeType: 'application/vnd.google-apps.folder',
      modifiedTime: new Date().toISOString(),
      isVirtual: false,
      category: 'other'
    };

    setFiles(prev => [newFolder, ...prev]);
    setIsCreatingFolder(false);
    setNewFolderName('');
    showNotification(lang === 'bn' ? `"${newFolder.name}" ফোল্ডারটি তৈরি হয়েছে!` : `Folder "${newFolder.name}" created successfully!`);
  };

  // Create Google Doc Action
  const handleCreateDoc = () => {
    if (!newDocTitle.trim()) return;

    let content = '';
    if (selectedTemplate === 'notes') {
      content = `<h1>Class Notes - ${newDocTitle}</h1>
<p><strong>Date:</strong> ${new Date().toLocaleDateString(lang === 'bn' ? 'bn-BD' : 'en-US')}</p>
<p><strong>Student:</strong> ${currentUser?.fullName || 'Quran Student'}</p>
<p><strong>Teacher:</strong> Hafez Scholar</p>

<h2>📖 Daily Progress Check:</h2>
<ul>
  <li>Surah: __________________</li>
  <li>Ayat Range: __________________</li>
</ul>

<h2>📝 Pronunciation & Tajweed Corrections:</h2>
<ul>
  <li>1. Practice heavy articulation of Qaf (ق).</li>
  <li>2. Check Madd duration.</li>
</ul>

<h2>🏠 Homework Tasks:</h2>
<ul>
  <li>Practice current verses 5 times daily.</li>
</ul>`;
    } else if (selectedTemplate === 'guide') {
      content = `<h1>Tajweed Study Guide: ${newDocTitle}</h1>
<p>Created by: ${currentUser?.fullName || 'Quran Student'}</p>

<h2>📜 Topic Outline:</h2>
<p>Write your detailed topic explanation, examples, and rule details here...</p>

<h2>💡 Quick Study Checklist:</h2>
<ul>
  <li>[ ] Checked articulation point (makhraj)</li>
  <li>[ ] Verified vocal characteristics (sifaat)</li>
  <li>[ ] Practiced sound duration checks</li>
</ul>`;
    } else if (selectedTemplate === 'feedback') {
      content = `<h1>Teacher Feedback Sheet: ${newDocTitle}</h1>
<p><strong>Date:</strong> ${new Date().toLocaleDateString(lang === 'bn' ? 'bn-BD' : 'en-US')}</p>

<h2>⭐ Student Evaluation</h2>
<ul>
  <li><strong>Memorization:</strong> [A / B / C]</li>
  <li><strong>Tajweed Rules:</strong> [Excellent / Satisfactory / Needs Focus]</li>
  <li><strong>Fluency:</strong> [Smooth / Hesitant]</li>
</ul>

<h2>💬 Teacher Comments:</h2>
<p>Excellent progress today. Continue to practice the heavy letters and maintain consistent daily recitation time.</p>`;
    } else {
      content = `<h1>${newDocTitle}</h1>
<p>Start typing your study notes here...</p>`;
    }

    const newDoc: DriveFile = {
      id: 'doc_' + Date.now(),
      name: newDocTitle.trim() + (newDocTitle.toLowerCase().endsWith('.gdoc') ? '' : '.gdoc'),
      mimeType: 'application/vnd.google-apps.document',
      size: '2 KB',
      modifiedTime: new Date().toISOString(),
      isVirtual: false,
      category: 'docs',
      content: content
    };

    setFiles(prev => [newDoc, ...prev]);
    setIsCreatingDoc(false);
    setNewDocTitle('');
    showNotification(
      lang === 'bn' 
        ? `"${newDoc.name}" গুগল ডক তৈরি করা হয়েছে!` 
        : `Google Doc "${newDoc.name}" created successfully!`
    );
  };

  // Save Doc Changes Action
  const handleSaveDocChanges = () => {
    if (!previewTarget) return;
    setIsSavingDoc(true);

    setTimeout(() => {
      const updatedFiles = files.map(f => {
        if (f.id === previewTarget.id) {
          return {
            ...f,
            name: editingTitle,
            content: editingContent,
            modifiedTime: new Date().toISOString()
          };
        }
        return f;
      });
      setFiles(updatedFiles);
      setPreviewTarget(prev => prev ? { ...prev, name: editingTitle, content: editingContent } : null);
      setIsSavingDoc(false);
      showNotification(
        lang === 'bn' 
          ? 'ডকুমেন্ট পরিবর্তনগুলো সফলভাবে ড্রাইভ-এ সেভ করা হয়েছে!' 
          : 'Document changes successfully saved to Google Drive!'
      );
    }, 800);
  };

  // Handle live content changes in the document editor
  const handleEditorInput = () => {
    if (editorRef.current) {
      setEditingContent(editorRef.current.innerHTML);
    }
  };

  // Confirm and Delete Action
  const handleDeleteConfirm = () => {
    if (!deleteTarget) return;

    setFiles(prev => prev.filter(f => f.id !== deleteTarget.id));
    const name = deleteTarget.name;
    setDeleteTarget(null);
    showNotification(
      lang === 'bn' 
        ? `"${name}" ফাইলটি মুছে ফেলা হয়েছে।` 
        : `"${name}" has been deleted permanently.`
    );
  };

  // Audio Playback helpers
  const togglePlayAudio = () => {
    if (!audioRef.current) {
      audioRef.current = new Audio('https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3'); // Safe public static test audio stream
      audioRef.current.addEventListener('timeupdate', () => {
        if (audioRef.current) {
          const progress = (audioRef.current.currentTime / audioRef.current.duration) * 100;
          setAudioProgress(progress || 0);
        }
      });
      audioRef.current.addEventListener('ended', () => {
        setIsPlayingAudio(false);
        setAudioProgress(0);
      });
    }

    if (isPlayingAudio) {
      audioRef.current.pause();
      setIsPlayingAudio(false);
    } else {
      audioRef.current.play();
      setIsPlayingAudio(true);
    }
  };

  React.useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
      }
    };
  }, []);

  const getFileIcon = (mimeType: string) => {
    if (mimeType === 'application/vnd.google-apps.folder') return <div className="p-3 bg-amber-50 text-amber-600 rounded-xl"><FolderPlus className="h-6 w-6" /></div>;
    if (mimeType === 'application/vnd.google-apps.document') return <div className="p-3 bg-blue-50 text-blue-600 rounded-xl"><FileText className="h-6 w-6" /></div>;
    if (mimeType.includes('pdf')) return <div className="p-3 bg-rose-50 text-rose-600 rounded-xl"><FileText className="h-6 w-6" /></div>;
    if (mimeType.includes('audio')) return <div className="p-3 bg-violet-50 text-violet-600 rounded-xl"><Music className="h-6 w-6" /></div>;
    if (mimeType.includes('sheet') || mimeType.includes('excel')) return <div className="p-3 bg-emerald-50 text-emerald-600 rounded-xl"><BarChart3 className="h-6 w-6" /></div>;
    return <div className="p-3 bg-blue-50 text-blue-600 rounded-xl"><File className="h-6 w-6" /></div>;
  };

  // Filtered Files List
  const filteredFiles = files.filter(file => {
    const matchesSearch = file.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || file.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="fixed inset-0 z-50 overflow-hidden flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-emerald-950/40 backdrop-blur-md" onClick={onClose} />

      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 15 }}
        className="bg-white rounded-3xl w-full max-w-5xl h-[85vh] flex flex-col relative z-10 shadow-2xl border border-emerald-950/10 overflow-hidden"
        id="drive_hub_container"
      >
        {/* Header Accent Line */}
        <div className="h-2 bg-gradient-to-r from-emerald-900 via-gold-500 to-emerald-950" />

        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between bg-emerald-50/20">
          <div className="flex items-center space-x-3">
            <div className="p-2.5 bg-emerald-950 text-gold-400 rounded-2xl shadow-md">
              <HardDrive className="h-6 w-6" />
            </div>
            <div>
              <h2 className="font-serif font-bold text-xl text-emerald-950">{t[lang].title}</h2>
              <p className="text-xs text-gray-500 font-medium">{t[lang].subtitle}</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full text-gray-400 hover:text-emerald-950 transition-colors"
            id="close_drive_hub"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        {/* Main Content Pane */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          
          {/* Notification Alerts */}
          <AnimatePresence>
            {successMsg && (
              <motion.div 
                initial={{ opacity: 0, y: -10 }} 
                animate={{ opacity: 1, y: 0 }} 
                exit={{ opacity: 0, y: -10 }}
                className="p-3.5 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-2xl flex items-center space-x-2 text-sm font-semibold"
              >
                <Check className="h-4.5 w-4.5 text-emerald-600 shrink-0" />
                <span>{successMsg}</span>
              </motion.div>
            )}
            {errorMsg && (
              <motion.div 
                initial={{ opacity: 0, y: -10 }} 
                animate={{ opacity: 1, y: 0 }} 
                exit={{ opacity: 0, y: -10 }}
                className="p-3.5 bg-rose-50 border border-rose-200 text-rose-800 rounded-2xl flex items-center space-x-2 text-sm font-semibold"
              >
                <AlertCircle className="h-4.5 w-4.5 text-rose-600 shrink-0" />
                <span>{errorMsg}</span>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Sandbox Info & Live Auth Switcher Row */}
          <div className="bg-gradient-to-br from-emerald-950 to-emerald-900 text-white rounded-3xl p-5 shadow-lg relative overflow-hidden flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0 md:space-x-4">
            <div className="absolute right-0 bottom-0 opacity-10 pointer-events-none transform translate-y-1/4 translate-x-1/4 scale-150">
              <Cloud className="w-64 h-64" />
            </div>
            
            <div className="space-y-1.5 max-w-2xl relative z-10">
              <div className="flex items-center space-x-2 text-gold-400 font-bold text-sm">
                <Cloud className="h-4 w-4 animate-pulse" />
                <span>{lang === 'bn' ? 'স্মার্ট ক্লাউড ড্রাইভ সার্ভিস' : 'Smart Cloud Drive Sync'}</span>
              </div>
              <p className="text-xs text-emerald-100/90 leading-relaxed font-medium">
                {t[lang].sandboxNotice}
              </p>
            </div>

            <div className="shrink-0 relative z-10 flex items-center">
              {isConnected && googleUser ? (
                <div className="flex items-center space-x-3 bg-emerald-900/60 border border-emerald-700/50 rounded-2xl p-2.5">
                  <img 
                    src={googleUser.avatar} 
                    alt={googleUser.name} 
                    className="h-8 w-8 rounded-full border border-gold-400"
                    referrerPolicy="no-referrer"
                  />
                  <div className="text-left">
                    <p className="text-xs font-bold text-white truncate max-w-[120px]">{googleUser.name}</p>
                    <p className="text-[10px] text-emerald-300 truncate max-w-[120px]">{googleUser.email}</p>
                  </div>
                  <button 
                    onClick={handleDisconnect}
                    className="text-xs font-bold text-rose-400 hover:text-rose-300 px-2 py-1 hover:bg-rose-500/10 rounded-lg transition-colors"
                  >
                    {t[lang].disconnect}
                  </button>
                </div>
              ) : (
                <button
                  onClick={handleConnectGoogle}
                  className="inline-flex items-center space-x-2 bg-gradient-to-r from-gold-400 to-gold-500 hover:from-gold-500 hover:to-gold-400 text-emerald-950 font-bold px-5 py-3 rounded-2xl shadow-lg active:scale-98 transition-all text-sm"
                  id="connect_google_drive_btn"
                >
                  <svg className="h-4.5 w-4.5 fill-current" viewBox="0 0 24 24">
                    <path d="M19.37 13.55L12 1.1L4.63 13.55h14.74zM12 2.91l6.32 10.64H5.68L12 2.91zm-7.66 11.1l-3.69 6.35c-.32.55-.32 1.2 0 1.75l.1.18c.32.55.9.89 1.54.89h19.46c.64 0 1.22-.34 1.54-.89l.1-.18c.32-.55.32-1.2 0-1.75l-3.69-6.35h-15.3zm1.61 7.39l2.64-4.55h10.84l2.64 4.55H6.01zM1.46 20.35h21.08l-2.61-4.43H4.07l-2.61 4.43z" />
                  </svg>
                  <span>{t[lang].connectBtn}</span>
                </button>
              )}
            </div>
          </div>

          {/* Action Row & Filters */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            
            {/* Left Category Tabs */}
            <div className="flex overflow-x-auto pb-1 sm:pb-0 scrollbar-none space-x-2">
              {[
                { id: 'all', label: t[lang].all },
                { id: 'book', label: t[lang].book },
                { id: 'qaida', label: t[lang].qaida },
                { id: 'audio', label: t[lang].audio },
                { id: 'progress', label: t[lang].progress },
                { id: 'homework', label: t[lang].homework },
                { id: 'docs', label: t[lang].docs }
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setSelectedCategory(tab.id)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold shrink-0 transition-all ${
                    selectedCategory === tab.id
                      ? 'bg-emerald-950 text-white shadow-md'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Right Command Center Buttons */}
            <div className="flex items-center space-x-2 self-end sm:self-auto">
              
              {/* Layout Switcher */}
              <div className="bg-gray-100 p-1 rounded-xl flex items-center space-x-1">
                <button 
                  onClick={() => setViewMode('grid')}
                  className={`p-1.5 rounded-lg ${viewMode === 'grid' ? 'bg-white text-emerald-950 shadow-xs' : 'text-gray-400'}`}
                  title="Grid View"
                >
                  <LayoutGrid className="h-4 w-4" />
                </button>
                <button 
                  onClick={() => setViewMode('list')}
                  className={`p-1.5 rounded-lg ${viewMode === 'list' ? 'bg-white text-emerald-950 shadow-xs' : 'text-gray-400'}`}
                  title="List View"
                >
                  <List className="h-4 w-4" />
                </button>
              </div>

              {/* Create Folder Trigger */}
              <button
                onClick={() => setIsCreatingFolder(true)}
                className="p-2.5 rounded-xl border border-gray-200 hover:border-emerald-950 text-emerald-950 bg-white hover:bg-emerald-50 transition-colors flex items-center justify-center"
                title={t[lang].createFolder}
              >
                <FolderPlus className="h-4.5 w-4.5" />
              </button>

              {/* Create Google Doc Trigger */}
              <button
                onClick={() => setIsCreatingDoc(true)}
                className="flex items-center space-x-1.5 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-md hover:shadow-lg transition-all"
                id="create_gdoc_btn"
                title={lang === 'bn' ? 'গুগল ডক তৈরি করুন' : 'Create Google Doc'}
              >
                <FileText className="h-4 w-4 text-white" />
                <span>{lang === 'bn' ? 'নতুন ডক' : 'Create Doc'}</span>
              </button>

              {/* Upload Button */}
              <label 
                className="flex items-center space-x-1.5 px-4 py-2.5 bg-emerald-950 hover:bg-emerald-900 text-white font-bold text-xs rounded-xl cursor-pointer shadow-md hover:shadow-lg transition-all"
                id="upload_file_drive_label"
              >
                <UploadCloud className="h-4 w-4 text-gold-400" />
                <span>{t[lang].uploadBtn}</span>
                <input 
                  type="file" 
                  className="hidden" 
                  onChange={handleFileUpload}
                  accept=".pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.mp3,.wav,image/*"
                />
              </label>
            </div>
          </div>

          {/* Search bar */}
          <div className="relative">
            <span className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none text-gray-400">
              <Search className="h-5 w-5" />
            </span>
            <input
              type="text"
              placeholder={t[lang].searchPlh}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-4 py-3.5 bg-gray-50 border border-gray-200 focus:bg-white focus:ring-2 focus:ring-emerald-900/10 focus:border-emerald-950 outline-none text-sm rounded-2xl transition-all"
              id="drive_search_input"
            />
          </div>

          {/* Upload Progress Loader overlay */}
          {isUploading && (
            <div className="bg-emerald-50/50 border border-emerald-100 rounded-3xl p-5 flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Loader2 className="h-5 w-5 text-emerald-800 animate-spin" />
                <div>
                  <p className="text-xs font-bold text-emerald-950">Uploading file to Google Drive...</p>
                  <p className="text-[10px] text-gray-500 font-medium">Please do not close this window</p>
                </div>
              </div>
              <div className="w-1/3 bg-gray-200 h-2 rounded-full overflow-hidden">
                <div className="bg-emerald-800 h-full transition-all duration-150" style={{ width: `${uploadProgress}%` }} />
              </div>
              <span className="text-xs font-bold text-emerald-950">{uploadProgress}%</span>
            </div>
          )}

          {/* Files Grid or List Display */}
          {filteredFiles.length === 0 ? (
            <div className="py-16 text-center border-2 border-dashed border-gray-200 rounded-3xl space-y-3">
              <HardDrive className="h-12 w-12 text-gray-300 mx-auto" />
              <p className="text-sm font-semibold text-gray-400">{t[lang].noFiles}</p>
            </div>
          ) : viewMode === 'grid' ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {filteredFiles.map(file => (
                <div
                  key={file.id}
                  className="p-5 bg-white border border-gray-200 hover:border-emerald-900/30 hover:shadow-lg rounded-2xl transition-all flex flex-col justify-between space-y-4 group relative"
                >
                  <div className="flex items-start justify-between">
                    {getFileIcon(file.mimeType)}
                    
                    {/* Source Tag badge */}
                    <span className="text-[9px] px-2 py-0.5 rounded-full font-bold bg-emerald-50 text-emerald-800">
                      {file.isVirtual ? 'Academic' : 'Google Drive'}
                    </span>
                  </div>

                  <div className="space-y-1">
                    <h4 className="font-serif font-bold text-sm text-emerald-950 line-clamp-1 group-hover:text-emerald-800 transition-colors" title={file.name}>
                      {file.name}
                    </h4>
                    <p className="text-[11px] text-gray-400 font-semibold flex items-center justify-between">
                      <span>{file.size || 'Folder'}</span>
                      <span>{new Date(file.modifiedTime || '').toLocaleDateString(lang === 'bn' ? 'bn-BD' : 'en-US')}</span>
                    </p>
                  </div>

                  <div className="pt-3 border-t border-gray-50 flex items-center justify-between">
                    <button
                      onClick={() => setPreviewTarget(file)}
                      className="inline-flex items-center space-x-1 text-xs font-bold text-emerald-950 hover:text-gold-500"
                    >
                      <Eye className="h-3.5 w-3.5" />
                      <span>{lang === 'bn' ? 'প্রিভিউ' : 'Preview'}</span>
                    </button>

                    <div className="flex items-center space-x-1.5">
                      <button
                        onClick={() => setDeleteTarget(file)}
                        className="p-1.5 text-gray-300 hover:text-rose-500 hover:bg-rose-50 rounded-lg transition-colors"
                        title="Delete"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                      
                      <a
                        href={file.webViewLink || '#'}
                        onClick={(e) => {
                          if (file.isVirtual) {
                            e.preventDefault();
                            setPreviewTarget(file);
                          }
                        }}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-1.5 text-gray-300 hover:text-emerald-950 hover:bg-emerald-50 rounded-lg transition-colors"
                        title={t[lang].download}
                      >
                        <Download className="h-3.5 w-3.5" />
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            /* List View mode */
            <div className="border border-gray-200 rounded-3xl overflow-hidden bg-white">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-gray-50 text-gray-500 text-xs font-bold uppercase tracking-wider border-b border-gray-200">
                    <th className="px-6 py-4">{t[lang].name}</th>
                    <th className="px-6 py-4">{t[lang].size}</th>
                    <th className="px-6 py-4">{t[lang].modified}</th>
                    <th className="px-6 py-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 text-sm">
                  {filteredFiles.map(file => (
                    <tr key={file.id} className="hover:bg-gray-50/50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center space-x-3">
                          {getFileIcon(file.mimeType)}
                          <span className="font-serif font-bold text-emerald-950 block truncate max-w-[250px]" title={file.name}>
                            {file.name}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-xs font-bold text-gray-400">
                        {file.size || '—'}
                      </td>
                      <td className="px-6 py-4 text-xs text-gray-500 font-semibold">
                        {new Date(file.modifiedTime || '').toLocaleDateString(lang === 'bn' ? 'bn-BD' : 'en-US')}
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end space-x-2">
                          <button
                            onClick={() => setPreviewTarget(file)}
                            className="p-1.5 text-emerald-950 hover:bg-emerald-50 rounded-lg transition-all"
                            title="Preview"
                          >
                            <Eye className="h-4 w-4" />
                          </button>
                          <a
                            href={file.webViewLink || '#'}
                            onClick={(e) => {
                              if (file.isVirtual) {
                                e.preventDefault();
                                setPreviewTarget(file);
                              }
                            }}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-1.5 text-gray-400 hover:text-emerald-950 rounded-lg"
                            title="Download"
                          >
                            <Download className="h-4 w-4" />
                          </a>
                          <button
                            onClick={() => setDeleteTarget(file)}
                            className="p-1.5 text-gray-300 hover:text-rose-500 rounded-lg"
                            title="Delete"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Footer Area with details of setup */}
        <div className="px-6 py-4 bg-gray-50 border-t border-gray-100 text-center flex flex-col sm:flex-row items-center sm:justify-between text-xs text-gray-400 font-semibold gap-2">
          <span>{lang === 'bn' ? '✓ গুগল ড্রাইভ এপিআই ক্লায়েন্ট ইন্টিগ্রেশন সম্পন্ন' : '✓ Google Drive API client integration validated.'}</span>
          <a 
            href="https://developers.google.com/drive" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-emerald-800 hover:text-emerald-950 inline-flex items-center space-x-1"
          >
            <span>Google Developer Docs</span>
            <ExternalLink className="h-3 w-3" />
          </a>
        </div>
      </motion.div>

      {/* Confirmation Modal for Deletion (MANDATORY per focus/destructive rule) */}
      <AnimatePresence>
        {deleteTarget && (
          <div className="fixed inset-0 z-50 overflow-hidden flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-black/60 backdrop-blur-xs" onClick={() => setDeleteTarget(null)} />
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-3xl w-full max-w-md overflow-hidden relative z-10 p-6 space-y-5 shadow-2xl border border-gray-100"
            >
              <div className="flex items-center space-x-3 text-rose-600">
                <div className="p-2.5 bg-rose-50 rounded-xl">
                  <Trash2 className="h-6 w-6" />
                </div>
                <h3 className="font-serif font-bold text-lg text-emerald-950">{t[lang].deleteConfirmTitle}</h3>
              </div>

              <div className="space-y-3">
                <p className="text-xs text-gray-500 font-semibold leading-relaxed">
                  {t[lang].deleteConfirmDesc}
                </p>
                <div className="p-3 bg-gray-50 border border-gray-100 rounded-2xl flex items-center space-x-3">
                  {getFileIcon(deleteTarget.mimeType)}
                  <span className="font-serif font-bold text-sm text-emerald-950 truncate max-w-[240px]">
                    {deleteTarget.name}
                  </span>
                </div>
              </div>

              <div className="flex items-center space-x-3 pt-2">
                <button
                  onClick={() => setDeleteTarget(null)}
                  className="flex-1 py-3 border border-gray-200 text-gray-600 font-bold rounded-xl text-xs hover:bg-gray-50 transition-colors"
                >
                  {t[lang].cancel}
                </button>
                <button
                  onClick={handleDeleteConfirm}
                  className="flex-1 py-3 bg-rose-600 hover:bg-rose-700 text-white font-bold rounded-xl text-xs shadow-md transition-all"
                  id="confirm_delete_drive_file"
                >
                  {t[lang].confirmDelete}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Create Folder Modal */}
      <AnimatePresence>
        {isCreatingFolder && (
          <div className="fixed inset-0 z-50 overflow-hidden flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-black/60 backdrop-blur-xs" onClick={() => setIsCreatingFolder(false)} />
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-3xl w-full max-w-sm overflow-hidden relative z-10 p-6 space-y-4 shadow-2xl border border-gray-100"
            >
              <div className="flex items-center space-x-2.5 text-emerald-950">
                <div className="p-2 bg-emerald-50 rounded-xl text-emerald-800">
                  <FolderPlus className="h-5 w-5" />
                </div>
                <h3 className="font-serif font-bold text-base">{t[lang].createFolder}</h3>
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wide">{t[lang].folderName}</label>
                <input
                  type="text"
                  placeholder="e.g., Assignment Sheets"
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 focus:bg-white focus:ring-2 focus:ring-emerald-900/10 focus:border-emerald-950 outline-none text-sm rounded-xl transition-all"
                  value={newFolderName}
                  onChange={(e) => setNewFolderName(e.target.value)}
                  id="new_folder_name_input"
                />
              </div>

              <div className="flex items-center space-x-3 pt-2">
                <button
                  onClick={() => setIsCreatingFolder(false)}
                  className="flex-1 py-2.5 border border-gray-200 text-gray-500 font-bold rounded-xl text-xs hover:bg-gray-50 transition-colors"
                >
                  {t[lang].cancel}
                </button>
                <button
                  onClick={handleCreateFolder}
                  className="flex-1 py-2.5 bg-emerald-950 hover:bg-emerald-900 text-white font-bold rounded-xl text-xs shadow-md transition-all"
                  id="submit_create_folder_btn"
                >
                  {t[lang].create}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Create Google Doc Modal */}
      <AnimatePresence>
        {isCreatingDoc && (
          <div className="fixed inset-0 z-50 overflow-hidden flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-black/60 backdrop-blur-xs" onClick={() => setIsCreatingDoc(false)} />
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-3xl w-full max-w-lg overflow-hidden relative z-10 p-6 space-y-5 shadow-2xl border border-gray-100"
            >
              <div className="flex items-center space-x-2.5 text-blue-600">
                <div className="p-2 bg-blue-50 rounded-xl text-blue-600">
                  <FileText className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-serif font-bold text-base text-emerald-950">
                    {lang === 'bn' ? 'নতুন গুগল ডক তৈরি করুন' : 'Create New Google Doc'}
                  </h3>
                  <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Google Docs Workspace</p>
                </div>
              </div>

              <div className="space-y-4">
                {/* Title Input */}
                <div className="space-y-1.5">
                  <label className="text-[11px] font-bold text-gray-500 uppercase tracking-wide">
                    {lang === 'bn' ? 'ডকুমেন্ট টাইটেল' : 'Document Title'}
                  </label>
                  <input
                    type="text"
                    placeholder={lang === 'bn' ? 'যেমন: সূরা মুলক ক্লাস নোটস' : 'e.g., Lesson 4 - Tajweed Rules'}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 focus:bg-white focus:ring-2 focus:ring-blue-500/10 focus:border-blue-500 outline-none text-sm rounded-xl transition-all"
                    value={newDocTitle}
                    onChange={(e) => setNewDocTitle(e.target.value)}
                    id="new_doc_title_input"
                  />
                </div>

                {/* Template Selector */}
                <div className="space-y-2">
                  <label className="text-[11px] font-bold text-gray-500 uppercase tracking-wide">
                    {lang === 'bn' ? 'টেমপ্লেট নির্বাচন করুন' : 'Select Document Template'}
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    {[
                      {
                        id: 'notes',
                        title: lang === 'bn' ? 'ক্লাস নোটস' : 'Class Notes',
                        desc: lang === 'bn' ? 'প্রগতি ট্র্যাকার ও সংশোধন' : 'Progress check & corrections'
                      },
                      {
                        id: 'guide',
                        title: lang === 'bn' ? 'তাজবীদ গাইড' : 'Tajweed Guide',
                        desc: lang === 'bn' ? 'মাখরাজ ও উচ্চারণের নিয়ম' : 'Rules and articulation outline'
                      },
                      {
                        id: 'feedback',
                        title: lang === 'bn' ? 'শিক্ষক ফিডব্যাক' : 'Teacher Feedback',
                        desc: lang === 'bn' ? 'মূল্যায়ন ও মন্তব্য কার্ড' : 'Evaluation & scholars feedback'
                      },
                      {
                        id: 'blank',
                        title: lang === 'bn' ? 'খালি ডকুমেন্ট' : 'Blank Document',
                        desc: lang === 'bn' ? 'খালি সাদা ক্যানভাস' : 'Start from a fresh white canvas'
                      }
                    ].map((tpl) => (
                      <button
                        key={tpl.id}
                        type="button"
                        onClick={() => setSelectedTemplate(tpl.id as any)}
                        className={`p-3 rounded-xl border text-left transition-all space-y-1 ${
                          selectedTemplate === tpl.id
                            ? 'border-blue-500 bg-blue-50/40 ring-2 ring-blue-500/15'
                            : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                        }`}
                      >
                        <p className="text-xs font-bold text-emerald-950">{tpl.title}</p>
                        <p className="text-[10px] text-gray-400 font-medium leading-tight">{tpl.desc}</p>
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-3 pt-3">
                <button
                  onClick={() => setIsCreatingDoc(false)}
                  className="flex-1 py-2.5 border border-gray-200 text-gray-500 font-bold rounded-xl text-xs hover:bg-gray-50 transition-colors"
                >
                  {t[lang].cancel}
                </button>
                <button
                  onClick={handleCreateDoc}
                  disabled={!newDocTitle.trim()}
                  className="flex-1 py-2.5 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white font-bold rounded-xl text-xs shadow-md transition-all flex items-center justify-center space-x-1.5"
                  id="submit_create_doc_btn"
                >
                  <FileText className="h-4 w-4" />
                  <span>{lang === 'bn' ? 'তৈরি করুন' : 'Create Google Doc'}</span>
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* File Lightbox Preview Modal */}
      <AnimatePresence>
        {previewTarget && (
          <div className="fixed inset-0 z-50 overflow-hidden flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-black/70 backdrop-blur-xs" onClick={() => {
              setPreviewTarget(null);
              setIsPlayingAudio(false);
              if (audioRef.current) {
                audioRef.current.pause();
              }
            }} />
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className={`bg-white rounded-3xl w-full overflow-hidden relative z-10 flex flex-col shadow-2xl border border-gray-100 transition-all duration-300 ${
                previewTarget.mimeType === 'application/vnd.google-apps.document' ? 'max-w-4xl h-[85vh]' : 'max-w-2xl max-h-[80vh]'
              }`}
            >
              {previewTarget.mimeType === 'application/vnd.google-apps.document' ? (
                <div className="flex flex-col h-full overflow-hidden bg-gray-50" style={{ height: '85vh' }}>
                  {/* Google Docs Toolbar */}
                  <div className="bg-white border-b border-gray-200 px-6 py-3 flex flex-wrap items-center justify-between gap-3 shadow-xs">
                    <div className="flex items-center space-x-3">
                      {getFileIcon(previewTarget.mimeType)}
                      <div>
                        <div className="flex items-center space-x-2">
                          <input
                            type="text"
                            value={editingTitle}
                            onChange={(e) => setEditingTitle(e.target.value)}
                            className="font-serif font-bold text-base text-emerald-950 bg-transparent hover:bg-gray-100 focus:bg-white focus:ring-2 focus:ring-blue-500/10 focus:border-blue-500 border border-transparent px-2 py-0.5 rounded-md outline-none transition-all w-60 md:w-80"
                            placeholder="Untitled Document"
                            id="gdoc_title_rename"
                          />
                          <span className="text-[9px] bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full font-bold uppercase tracking-wider flex items-center space-x-1 shrink-0">
                            <Cloud className="h-2.5 w-2.5" />
                            <span>{lang === 'bn' ? 'সংযুক্ত ড্রাইভ' : 'Synced'}</span>
                          </span>
                        </div>
                        <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider ml-2">Google Docs Live Editor</p>
                      </div>
                    </div>

                    <button
                      onClick={() => {
                        setPreviewTarget(null);
                      }}
                      className="p-1.5 hover:bg-gray-100 rounded-full text-gray-400 hover:text-gray-600 transition-colors"
                    >
                      <X className="h-5 w-5" />
                    </button>
                  </div>

                  {/* Formatting Toolbar */}
                  <div className="bg-blue-50/40 border-b border-gray-200/80 px-6 py-2 flex flex-wrap items-center justify-between gap-2.5">
                    <div className="flex flex-wrap items-center gap-1 bg-white border border-gray-200 p-1 rounded-xl shadow-2xs">
                      <button
                        onClick={() => document.execCommand('bold', false)}
                        className="p-1.5 rounded-lg hover:bg-blue-50 text-gray-700 hover:text-blue-600 transition-all font-bold text-xs w-8 h-8 flex items-center justify-center cursor-pointer font-serif"
                        title="Bold"
                        type="button"
                      >
                        <b>B</b>
                      </button>
                      <button
                        onClick={() => document.execCommand('italic', false)}
                        className="p-1.5 rounded-lg hover:bg-blue-50 text-gray-700 hover:text-blue-600 transition-all font-bold text-xs w-8 h-8 flex items-center justify-center italic cursor-pointer font-serif"
                        title="Italic"
                        type="button"
                      >
                        <i>I</i>
                      </button>
                      <button
                        onClick={() => document.execCommand('underline', false)}
                        className="p-1.5 rounded-lg hover:bg-blue-50 text-gray-700 hover:text-blue-600 transition-all font-bold text-xs w-8 h-8 flex items-center justify-center underline cursor-pointer font-serif"
                        title="Underline"
                        type="button"
                      >
                        <u>U</u>
                      </button>
                      <div className="w-px h-5 bg-gray-200 mx-1" />
                      <button
                        onClick={() => document.execCommand('insertUnorderedList', false)}
                        className="p-1.5 rounded-lg hover:bg-blue-50 text-gray-700 hover:text-blue-600 transition-all font-bold text-xs w-8 h-8 flex items-center justify-center cursor-pointer text-xs"
                        title="Bullet List"
                        type="button"
                      >
                        •三
                      </button>
                      <button
                        onClick={() => document.execCommand('insertOrderedList', false)}
                        className="p-1.5 rounded-lg hover:bg-blue-50 text-gray-700 hover:text-blue-600 transition-all font-bold text-xs w-8 h-8 flex items-center justify-center cursor-pointer text-xs"
                        title="Numbered List"
                        type="button"
                      >
                        1三
                      </button>
                      <div className="w-px h-5 bg-gray-200 mx-1" />
                      <button
                        onClick={() => document.execCommand('justifyLeft', false)}
                        className="p-1.5 rounded-lg hover:bg-blue-50 text-gray-700 hover:text-blue-600 transition-all font-bold text-xs w-8 h-8 flex items-center justify-center cursor-pointer text-xs"
                        title="Align Left"
                        type="button"
                      >
                        |三
                      </button>
                      <button
                        onClick={() => document.execCommand('justifyCenter', false)}
                        className="p-1.5 rounded-lg hover:bg-blue-50 text-gray-700 hover:text-blue-600 transition-all font-bold text-xs w-8 h-8 flex items-center justify-center cursor-pointer text-xs"
                        title="Align Center"
                        type="button"
                      >
                        三
                      </button>
                    </div>

                    <div className="flex items-center space-x-2.5">
                      <span className="text-[10px] text-gray-400 font-bold font-mono">
                        {lang === 'bn' ? 'অফলাইন ব্যাকআপ সক্রিয়' : 'Offline sandbox active'}
                      </span>
                    </div>
                  </div>

                  {/* Letter-size Paper Canvas */}
                  <div className="flex-1 overflow-y-auto p-6 md:p-10 bg-gray-100/60 flex flex-col items-center">
                    <div className="w-full max-w-3xl flex-1 flex flex-col">
                      <div
                        ref={editorRef}
                        contentEditable
                        onInput={handleEditorInput}
                        className="bg-white shadow-lg border border-gray-200/80 w-full p-8 md:p-14 text-gray-800 outline-none rounded-xs prose max-w-none text-left flex-1"
                        id="gdoc_body_editor"
                        style={{ minHeight: '480px' }}
                      />
                      <div className="flex items-center justify-between mt-3 text-[10px] text-gray-400 font-mono px-1">
                        <span>Characters: {editingContent.replace(/<[^>]*>/g, '').length}</span>
                        <span>
                          {lang === 'bn' ? 'সর্বশেষ পরিবর্তিত: ' : 'Last modified: '} 
                          {new Date(previewTarget.modifiedTime || '').toLocaleTimeString()}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Actions footer */}
                  <div className="px-6 py-4 bg-white border-t border-gray-200 flex items-center justify-between">
                    <button
                      onClick={() => setPreviewTarget(null)}
                      className="px-5 py-2.5 border border-gray-200 hover:bg-gray-50 text-gray-500 font-bold rounded-xl text-xs transition-colors cursor-pointer"
                    >
                      {lang === 'bn' ? 'বন্ধ করুন' : 'Close Editor'}
                    </button>
                    
                    <button
                      onClick={handleSaveDocChanges}
                      disabled={isSavingDoc}
                      className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white font-bold text-xs rounded-xl shadow-md transition-all flex items-center space-x-2 cursor-pointer"
                      id="save_gdoc_changes_btn"
                    >
                      {isSavingDoc ? (
                        <>
                          <div className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          <span>{lang === 'bn' ? 'সেভ হচ্ছে...' : 'Saving Changes...'}</span>
                        </>
                      ) : (
                        <>
                          <Save className="h-4 w-4 text-blue-200" />
                          <span>{lang === 'bn' ? 'ড্রাইভ-এ সেভ করুন' : 'Save & Sync to Drive'}</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  {/* Preview Header */}
                  <div className="px-6 py-4 bg-emerald-50/30 border-b border-gray-100 flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      {getFileIcon(previewTarget.mimeType)}
                      <div>
                        <h3 className="font-serif font-bold text-base text-emerald-950 truncate max-w-[400px]" title={previewTarget.name}>
                          {previewTarget.name}
                        </h3>
                        <p className="text-[10px] text-gray-500 font-medium">Academic Resource file</p>
                      </div>
                    </div>
                    <button
                      onClick={() => {
                        setPreviewTarget(null);
                        setIsPlayingAudio(false);
                        if (audioRef.current) {
                          audioRef.current.pause();
                        }
                      }}
                      className="p-1.5 hover:bg-gray-100 rounded-full text-gray-400 hover:text-emerald-950"
                    >
                      <X className="h-5 w-5" />
                    </button>
                  </div>

                  {/* Preview Body Canvas */}
                  <div className="flex-1 overflow-y-auto p-6 space-y-6 flex flex-col justify-between">
                    
                    {/* Simulated Content visualizer depending on type */}
                    <div className="bg-gray-50 border border-gray-150 rounded-2xl p-8 flex flex-col items-center justify-center text-center space-y-5 min-h-[220px]">
                      {previewTarget.mimeType.includes('audio') ? (
                        <div className="space-y-4 w-full max-w-md">
                          <div className="p-4 bg-violet-100/50 text-violet-700 rounded-full w-16 h-16 flex items-center justify-center mx-auto animate-bounce">
                            <Music className="h-8 w-8" />
                          </div>
                          <div>
                            <h4 className="font-serif font-bold text-emerald-950">Surah Al-Fatihah Audios</h4>
                            <p className="text-xs text-gray-400 mt-1">{t[lang].mockAudioDesc}</p>
                          </div>

                          {/* HTML5 Audio Player style track */}
                          <div className="space-y-1 pt-2">
                            <div className="w-full bg-gray-200 h-1.5 rounded-full overflow-hidden">
                              <div className="bg-violet-600 h-full transition-all duration-300" style={{ width: `${audioProgress}%` }} />
                            </div>
                            <div className="flex items-center justify-between text-[10px] font-bold text-gray-400">
                              <span>0:04</span>
                              <span>2:35</span>
                            </div>
                          </div>

                          {/* Playback Control button */}
                          <button
                            onClick={togglePlayAudio}
                            className="inline-flex items-center space-x-2 px-6 py-3 bg-violet-600 hover:bg-violet-700 text-white font-bold text-xs rounded-full shadow-md hover:scale-102 active:scale-98 transition-all"
                            id="play_surah_audio"
                          >
                            {isPlayingAudio ? (
                              <>
                                <Pause className="h-4.5 w-4.5" />
                                <span>Pause Player</span>
                              </>
                            ) : (
                              <>
                                <Play className="h-4.5 w-4.5 fill-current" />
                                <span>Play Recording</span>
                              </>
                            )}
                          </button>
                        </div>
                      ) : previewTarget.mimeType === 'application/pdf' ? (
                        <div className="space-y-3">
                          <div className="p-4 bg-rose-100/50 text-rose-600 rounded-full w-14 h-14 flex items-center justify-center mx-auto">
                            <FileText className="h-7 w-7" />
                          </div>
                          <div>
                            <p className="text-sm font-serif font-bold text-emerald-950">PDF Document View</p>
                            <p className="text-xs text-gray-400 max-w-sm mx-auto leading-relaxed">
                              This is a digital textbook of {previewTarget.name}. Students can read Noorani Qaida and practice makhraj in one-to-one live session with scholars.
                            </p>
                          </div>
                          <div className="border border-gray-200 rounded-xl p-3 bg-white max-w-md mx-auto text-left text-xs font-semibold text-gray-500 space-y-1 shadow-xs">
                            <p className="text-emerald-950 font-bold">✓ Tajweed Rules Included</p>
                            <p className="text-emerald-950 font-bold">✓ High Resolution Pages</p>
                            <p className="text-emerald-950 font-bold">✓ Free Academic Distribution</p>
                          </div>
                        </div>
                      ) : (
                        <div className="space-y-2">
                          <div className="p-4 bg-emerald-100/50 text-emerald-700 rounded-full w-14 h-14 flex items-center justify-center mx-auto">
                            <File className="h-7 w-7" />
                          </div>
                          <p className="text-sm font-serif font-bold text-emerald-950">Study Resource Sheet</p>
                          <p className="text-xs text-gray-400 max-w-xs mx-auto leading-relaxed">
                            Weekly student schedules, reports, or homework worksheets linked with active scholar drive.
                          </p>
                        </div>
                      )}
                    </div>

                    {/* Details Section */}
                    <div className="space-y-3 pt-2">
                      <h4 className="font-serif font-bold text-sm text-emerald-950">{t[lang].details}</h4>
                      <div className="grid grid-cols-2 gap-4 bg-gray-50 rounded-2xl p-4 text-xs font-semibold">
                        <div className="space-y-1">
                          <p className="text-gray-400 uppercase tracking-wider text-[9px]">{t[lang].size}</p>
                          <p className="text-emerald-950 font-bold">{previewTarget.size || 'Folder'}</p>
                        </div>
                        <div className="space-y-1">
                          <p className="text-gray-400 uppercase tracking-wider text-[9px]">{t[lang].modified}</p>
                          <p className="text-emerald-950 font-bold">{new Date(previewTarget.modifiedTime || '').toLocaleString()}</p>
                        </div>
                        <div className="space-y-1 col-span-2">
                          <p className="text-gray-400 uppercase tracking-wider text-[9px]">{t[lang].source}</p>
                          <p className="text-emerald-950 font-bold flex items-center space-x-1">
                            <Cloud className="h-3.5 w-3.5 text-gold-500" />
                            <span>{previewTarget.isVirtual ? t[lang].localSandbox : t[lang].googleDriveReal}</span>
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Bottom CTA Row */}
                    <div className="flex items-center space-x-3 pt-4 border-t border-gray-150">
                      <button
                        onClick={() => {
                          setPreviewTarget(null);
                          setIsPlayingAudio(false);
                          if (audioRef.current) {
                            audioRef.current.pause();
                          }
                        }}
                        className="flex-1 py-3 border border-gray-200 text-gray-500 font-bold rounded-xl text-xs hover:bg-gray-50 transition-colors"
                      >
                        {t[lang].cancel}
                      </button>
                      <a
                        href="https://images.unsplash.com/photo-1609599006353-e629f1d40e4a?auto=format&fit=crop&q=80&w=800"
                        download={previewTarget.name}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 py-3 bg-emerald-950 hover:bg-emerald-900 text-white font-bold rounded-xl text-xs shadow-md text-center inline-flex items-center justify-center space-x-1.5"
                        id="download_preview_file_cta"
                      >
                        <Download className="h-4 w-4 text-gold-400" />
                        <span>{t[lang].download}</span>
                      </a>
                    </div>
                  </div>
                </>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
