# react-autocomplete-tag

> A simple autocomplete tagging component for react app with typescript support

[![NPM](https://img.shields.io/npm/v/react-autocomplete-tag.svg)](https://www.npmjs.com/package/react-autocomplete-tag) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Requirements

- react: ^16.0.0

## Features

- Autocomplete based on suggestion list
- Keyboard friendly and mouse support

## Install

```bash
npm install --save react-autocomplete-tag
```

## Usage

```tsx
import React, { useState } from 'react'
import ReactTags from 'react-autocomplete-tag'

const App = () => {
  const tagList: string[] = [
    'America',
    'Argentina',
    'Bangladesh',
    'Burma',
    'China',
    'Chili',
    'Denmark'
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
```

## Options

| Option          | Type            | Default  Value      | Require / Optional | Description                                                                                                    |
| --------------- | --------------- | -------------- | ------------------ | -------------------------------------------------------------------------------------------------------------- |
| tags            | Array of String | []             | Require            | An array of tags that are displayed as pre-selected                                                      |
| suggestions     | Array of String | []             | Require            | An array of suggestions                                                                                        |
| placeholder     | String          | Enter tag      | Optional           | The placeholder for tag input                                                                                  |
| delimeters      | Array of String | ["Enter", ","] | Optional           | Specifies which characters should terminate tags input                                                         |
| onAddHandler    | Function        | undefined      | Require            | Function called when the user wants to add a tag                                                                |
| onDeleteHandler | Function        | undefined      | Require            | Function called when the user deletes a tag                                                                    |
| onChangeHandler | Function        | undefined      | Optional           | Function called when the tag input value change. This is where you can update suggestions based on input value |

## License

MIT © [joenayjoe](https://github.com/joenayjoe)
