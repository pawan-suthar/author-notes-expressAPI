const notesmodel = require("../modal/notes");

const createnote = async (req, res) => {
  const {title,description} = req.body;
  const newnote = new notesmodel({
    title:title,
    description:description,
    userId:req.userId
  })

  try {
    await newnote.save();
    res.status(201).json(newnote);
    
  } catch (error) {
    console.log(error);
    res.status(500).json({message:"Something went wrong"})
  }
  
};



const updatenote = async (req, res) => {
  const id = req.params.id;
  const {title,description} = req.body;

  const newnote = {
    title:title,
    description:description,
    userId:req.userId
  }

  try {
    await notesmodel.findByIdAndUpdate(id,newnote,{new:true})
    res.status(200).json(newnote )
    
  } catch (error) {
    console.log(error);
    res.status(500).json({message:"Something went wrong"})
  }

};



const deletenote = async (req, res) => {
  const id = req.params.id;
  try {
    const note = await notesmodel.findByIdAndRemove(id);
    res.status(202).json(note )
  } catch (error) {
    console.log(error);
    res.status(500).json({message:"Something went wrong"})
  }
};




const getnote = async (req, res) => {
  try {
    const notes = await notesmodel.find({userId: req.userId});
    res.status(200).json(notes)
    
  } catch (error) {
    console.log(error);
    res.status(500).json({message:"Something went wrong"})
  }
};

module.exports = {
  createnote,
  updatenote,
  deletenote,
  getnote,
};
