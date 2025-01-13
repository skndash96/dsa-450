// this script is to be run after changing dataFinal
// it will delete all notes that are not in the new dataFinal
// like notes for questions that no longer exist

import { createClient } from "@supabase/supabase-js";
import data from "../data.js";
import { config } from "dotenv";

config({
  path: ".env.local"
});

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SECRET_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

const cleanDb = async () => {
  const {
    data: notes,
    error
  } = await supabase.from('notes').select("*");
  
  console.log(notes.length, "notes found")

  if (error) {
    console.error(error);
    return;
  }

  const topics = new Set()
  const questions = new Set()

  data.forEach(topic => {
    topics.add(topic.id)
    topic.questions.forEach(question => {
      questions.add(question.id)
    })
  });

  for (let note of notes) {
    if (!topics.has(note.tid) || !questions.has(note.qid)) {
      console.log(`Deleting note ${note.id}`)
      
      const {
        error
      } = await supabase.from('notes').delete().eq('id', note.id);
      
      if (error) {
        console.error(error);
      }
    }
  }
}

cleanDb()