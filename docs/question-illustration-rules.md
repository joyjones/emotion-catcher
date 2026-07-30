# Question Illustration Rules

This document is the durable rulebook for generating quiz illustrations.
Follow it whenever adding or revising question images.

## Asset Contract

- Use one 16:9 illustration per illustrated question.
- Final shipped assets should be small WebP files at `800x450`.
- Keep files under `assets/question-illustrations/<mode>/`.
- Reference project assets with relative paths from `data.js`.
- Do not reference generated files under `.codex/generated_images`.

## Style

- Use a soft luminous anime school-life style.
- Prefer warm realistic light, delicate linework, quiet daily-life scenes, and gentle muted colors.
- Avoid poster text, captions, speech bubbles, logos, watermarks, and readable UI text.
- The image is an emotional clue, not an answer key; it should support the text without revealing the answer too bluntly.

## Character Focus

- Use a female protagonist as the primary emotional subject for `识别感受`.
- The protagonist must be the largest, sharpest, clearest person in the real physical scene.
- Other people may appear only when the question context truly includes physical co-presence.
- When other people appear physically, keep them smaller, softer, farther away, turned aside, or partly obscured.
- Never make multiple people equally prominent, because users must know whose emotion they are identifying.

## Context Fidelity

- Match the actual medium of the event.
- If the event happens online, in a chat, on a phone, in a feed, or through a posted photo, show other people only inside the device UI.
- Online events must not be turned into physical scenes in the protagonist's room, hallway, or nearby space.
- If the event is a memory, message, post, or result screen, represent it as a screen, paper, notice, or object, not as an impossible real-time scene.
- If the question is about a private inner state, solitude is often more accurate than adding people.

## Device And UI Rules

- Screens must be physically plausible.
- A phone has exactly one front glass screen; never place a screen or UI on the back of a phone.
- Prefer safe phone compositions: phone lying flat with screen facing up, or held upright with the front screen clearly facing the viewer.
- Avoid impossible reflections, duplicate screens, flipped screens, or UI floating outside the device.
- UI content must be unreadable: use blurred chat bubbles, avatar dots, and vague thumbnails rather than legible text.

## Prompt Checklist

Every prompt should specify:

- Asset type: in-app quiz illustration, 16:9 landscape, final `800x450`.
- Style: soft luminous anime school-life illustration.
- Subject: one female protagonist as the only emotional target.
- Context medium: physical scene, online chat, phone feed, posted photo, noticeboard, cafe, classroom, bedroom, etc.
- Composition: how the protagonist is visually prioritized.
- Constraint: no readable text, no captions, no logos, no watermark.
- Avoid: extra physical people when the scene is online; ambiguous emotional target; impossible phone/screen geometry.

## Reuse And Similarity

- Similar concepts may reuse composition patterns, but not if the context medium differs.
- Online exclusion, online silence, and message waiting can share the "device as context" pattern.
- Physical group contrast, public embarrassment, and boundary violation can share the "protagonist foreground, others background" pattern.
- Pure fatigue, helplessness, worry, and private regret usually work best as single-person scenes.

## Current Lessons Learned

- `f01` is an online group-chat silence scene: classmates should only appear as chat avatars/bubbles on the computer.
- `f03` is an online group-chat photo scene: the dinner photo should appear only on the phone screen, not as people in the room.
- For phone scenes, use a flat phone with screen facing upward when possible to reduce AI geometry errors.
- For jealousy (`f08`), a physical school result scene works because the opportunity result and classmates can plausibly be present in the same school space.
- For resistance before going out (`f09`), people can appear as blurred silhouettes outside the doorway because the prompt mentions people and noise outside.

