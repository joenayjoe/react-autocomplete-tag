import React, { useState } from 'react'

import ReactTags from 'react-autocomplete-tag';
import 'react-autocomplete-tag/dist/index.css'; // load default style

const App = () => {
  const tagList: string[] = [
    'America',
    'Argentina',
    'Africa',
    'Bangladesh',
    'Burma',
    'China',
    'Chile',
    'Denmark',
    ''
  ]
  var [tags, setTags] = useState<string[]>([])

  const [suggestions, setSuggestions] = useState<string[]>([])

  const addTag = (val: string) => {
    setTags([...tags, val])
    setSuggestions([])
  }

  const removeTag = (idx: number) => {
    var t = [...tags]
    t.splice(idx, 1)
    setTags(t)
  }

  const handleTagChange = (val: string) => {
    if (val.length > 0) {
      var new_sug: string[] = []
      tagList.forEach((t) => {
        if (t.includes(val)) {
          new_sug.push(t)
        }
      })
      setSuggestions(new_sug)
    } else {
      setSuggestions([])
    }
  }

  return (
    <ReactTags
      tags={tags}
      suggestions={suggestions}
      onAddHandler={(val: string) => addTag(val)}
      onDeleteHandler={(idx: number) => removeTag(idx)}
      onChangeHandler={(val: string) => handleTagChange(val)}
    />
  )
}

export default App
