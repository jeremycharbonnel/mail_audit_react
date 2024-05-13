import { useState, useRef, useEffect } from 'react'
import styled from 'styled-components'
import RecipientsBadge from './RecipientsBadge'

export function debounce(callback: Function, time: number) {
  let interval: number | undefined

  return () => {
    clearTimeout(interval)
    interval = setTimeout(() => {
      interval = undefined
      callback(arguments)
    }, time)
  }
}

export interface RecipientsTooltipProps {
  displayed: boolean
  recipients: string[]
}

const StyledWrapper = styled.div`
  position: fixed;
  right: 8px;
  top: 8px;
  display: flex;
  align-items: center;
  padding: 8px 16px;
  background-color: var(--color-primary);
  color: #f0f0f0;
  border-radius: 24px;
`

export function RecipientsTooltip({
  displayed,
  recipients,
}: RecipientsTooltipProps) {
  return (
    displayed && (
      <StyledWrapper>
        {recipients.map((recipient, index) => (
          <div key={index}>
            {recipient}
            <RecipientsComma index={index} length={recipients.length} />
          </div>
        ))}
      </StyledWrapper>
    )
  )
}

export interface RecipientsCommaProps {
  index: number
  length: number
}

export function RecipientsComma({ index, length }: RecipientsCommaProps) {
  if (index !== length - 1) {
    return <span>,&nbsp;</span>
  }
}

export interface RecipientsDotsProps {
  index: number
  length: number
  truncated: number
}

export function RecipientsDots({
  index,
  length,
  truncated,
}: RecipientsDotsProps) {
  if (truncated && index === length - truncated - 1) {
    return <span>,&nbsp;...</span>
  }
}

export interface RecipientsDisplayProps {
  recipients: string[]
}

function RecipientsDisplay({ recipients, ...rest }: RecipientsDisplayProps) {
  const recipientsWrapper = useRef<HTMLDivElement>(null)
  const hiddenRecipients = useRef<HTMLDivElement>(null)

  const [numTruncated, setNumTruncated] = useState<number>(0)
  const [badgeHovered, setBadgeHovered] = useState<boolean>(false)

  const [renderedRecipients, setRenderedRecipients] = useState<string[]>([])

  function updateRenderedRecipients() {
    const wrapperWidth: number = recipientsWrapper.current?.offsetWidth ?? 0

    let truncatedIndex: number = recipients.length

    hiddenRecipients.current &&
      [...hiddenRecipients.current.children].some(
        (recipient: Element, index: number) => {
          const recipientOffsetLeft: number = (recipient as HTMLDivElement)
            .offsetLeft
          const recipientOffsetWidth: number = (recipient as HTMLDivElement)
            .offsetWidth

          return (
            index &&
            recipientOffsetLeft + recipientOffsetWidth >= wrapperWidth - 40 &&
            (truncatedIndex = index)
          )
        },
      )

    setRenderedRecipients(recipients.slice(0, truncatedIndex))
    setNumTruncated(recipients.length - truncatedIndex)
  }

  useEffect(() => {
    updateRenderedRecipients()

    const debouncedHandleResize = debounce(updateRenderedRecipients, 200)

    window.addEventListener('resize', debouncedHandleResize)

    return () => {
      window.removeEventListener('resize', debouncedHandleResize)
    }
  }, [])

  return (
    <div {...rest}>
      <div ref={recipientsWrapper}>
        <div className="absolute hidden" ref={hiddenRecipients}>
          {recipients.map((recipient, index) => (
            <span key={index}>
              {recipient}
              <RecipientsComma
                index={index}
                length={renderedRecipients.length}
              />
              <RecipientsDots
                index={index}
                length={recipients.length}
                truncated={numTruncated}
              />
            </span>
          ))}
        </div>

        <div>
          {renderedRecipients.map((recipient, index) => (
            <span key={index}>
              {recipient}
              <RecipientsComma
                index={index}
                length={renderedRecipients.length}
              />
              <RecipientsDots
                index={index}
                length={recipients.length}
                truncated={numTruncated}
              />
            </span>
          ))}
        </div>
      </div>

      <RecipientsTooltip displayed={badgeHovered} recipients={recipients} />

      {numTruncated > 0 && (
        <RecipientsBadge
          numTruncated={numTruncated}
          onPointerEnter={() => setBadgeHovered(true)}
          onPointerLeave={() => setBadgeHovered(false)}
        />
      )}
    </div>
  )
}

export default styled(RecipientsDisplay)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;

  div {
    flex-grow: 1;
    overflow-x: hidden;
  }

  div > div {
    display: flex;
    align-items: center;
  }

  div > div > span:last-of-type {
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
  }

  > span:last-of-type {
    cursor: pointer;
  }

  .absolute {
    position: absolute;
  }

  .hidden {
    visibility: hidden;
  }
`
