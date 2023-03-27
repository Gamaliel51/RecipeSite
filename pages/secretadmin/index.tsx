import { useRef, useState } from "react"
import { Editor } from "@tinymce/tinymce-react"
import axios from "axios"

export default function AddDish(){
    
    const editorRef = useRef()
    const [name, setName] = useState('')
    const [link, setLink] = useState('')
    const [content, setContent] = useState('')

    const handleSubmit = async (e: any) => {
      e.preventDefault()
      const formData = new FormData()
      formData.append('name', name)
      formData.append('link', link)
      formData.append('content', content)

      const response = await axios.post('/api/addDish', {name: name, link: link, content: content})

    }

    return(
        <div>
            <form action="http://localhost:3000/api/addDish" method="POST" onSubmit={handleSubmit}>
              <input type="text" placeholder="Enter Dish Name" value={name} onChange={(e) => setName(e.target.value)} className="w-56" />
              <input type="text" placeholder="Enter Link" value={link} onChange={(e) => setLink(e.target.value)} className="w-56"  />
              <Editor value={content}
                onEditorChange={(contentNew) => setContent(contentNew)}/>
              <button type="submit">Log editor content</button>
            </form>
        </div>
    )
}