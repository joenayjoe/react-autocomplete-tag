import React, { useState, ChangeEvent } from 'react'

import "./index.css";

interface IProp {
  tags: string[]
  suggestions: string[]
  placeholder?: string
  delimeters?: string[]
  onAddHandler: (tag: string) => void
  onDeleteHandler: (idx: number) => void
  onChangeHandler?: (text: string) => void
}

const ReactTags: React.FunctionComponent<IProp> = (props) => {
  const [newTag, setNewTag] = useState<string>('')
  const [
    selectedAutoSuggestIndex,
    setSelectedAutoSuggestIndex
  ] = useState<number>(-1)
  const [typedTag, setTypedTag] = useState<string>('')

  const addTag = (idx: number) => {
    const t = props.suggestions[idx]
    props.onAddHandler(t)
    setNewTag('')
  }

  const TagAutoSuggestions = props.suggestions.map((sug, idx) => {
    var klass = 'suggestion_item'

    if (selectedAutoSuggestIndex === idx) {
      klass = klass + ' ' + 'suggestion_item_hover'
    }

    return (
      <li
        key={idx}
        className={klass}
        onMouseEnter={() => setSelectedAutoSuggestIndex(idx)}
      >
        <div onClick={() => addTag(idx)}>{sug}</div>
      </li>
    )
  })

  const SelectedTags = props.tags.map((tag, idx) => {
    return (
      <li key={idx} className={'tag_item'}>
        <span className={'tag_text'}>{tag}</span>
        <span
          className={'tag_close'}
          onClick={() => props.onDeleteHandler(idx)}
        >
          &times;
        </span>
      </li>
    )
  })

  const handleValueChange = (e: ChangeEvent<HTMLInputElement>) => {
    const t = e.target.value
    setNewTag(t)
    setTypedTag(t)
    props.onChangeHandler && props.onChangeHandler(t)
  }

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    let delimiters: string[] = props.delimeters
      ? props.delimeters
      : [',', 'Enter']
    if (delimiters.includes(e.key) && newTag !== '') {
      e.preventDefault()
      props.onAddHandler(newTag)
      setNewTag('')
    } else {
      const s = selectedAutoSuggestIndex

      if (e.key === 'ArrowUp') {
        if (s === -1) {
          setSelectedAutoSuggestIndex(props.suggestions.length - 1)
          setNewTag(props.suggestions[props.suggestions.length - 1])
        } else if (s === 0) {
          setSelectedAutoSuggestIndex(-1)
          setNewTag(typedTag)
        } else {
          setSelectedAutoSuggestIndex(s - 1)
          setNewTag(props.suggestions[s - 1])
        }
      } else if (e.key === 'ArrowDown') {
        if (s === props.suggestions.length - 1) {
          setSelectedAutoSuggestIndex(-1)
          setNewTag(typedTag)
        } else {
          setSelectedAutoSuggestIndex(s + 1)
          setNewTag(props.suggestions[s + 1])
        }
      }
    }
  }

  const autoSuggestionContainer = props.suggestions.length ? (
    <div className={'tag_autosuggestions'}>
      <ul>{TagAutoSuggestions}</ul>
    </div>
  ) : null

  const selectedTagContainer = props.tags.length ? (
    <div className={'selected_tags'}>
      <ul className={'selected_tag_list'}>{SelectedTags}</ul>
    </div>
  ) : null

  const tagInput = (
    <input
      type='text'
      className={'tag_input'}
      placeholder={props.placeholder ? props.placeholder : 'Enter a tag'}
      value={newTag}
      onChange={(e) => handleValueChange(e)}
      onKeyDown={(e) => handleKeyPress(e)}
    />
  )
  return (
    <div className={'autocomplete_tag'}>
      <div className={'tag_container'}>
        {selectedTagContainer}
        {tagInput}
      </div>
      {autoSuggestionContainer}
    </div>
  )
}
export default ReactTags
