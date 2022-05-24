const mongoose = require('mongoose');

const docSchema = new mongoose.Schema({
  title: { type: String, required: true },
  docType: { type: String, enum: ['doc','docx','log','msg','odt','pages','rtf','tex', 'txt','wpd','wps','csv','dat','ged','key','keychain','ppt','pptx','sdf','tar','xml','xls','xlr','xlsx'] },
  description: { type: String },
  link: { type: String },
  author: { type: [String] }
});

module.exports = mongoose.model('Documents', docSchema);
