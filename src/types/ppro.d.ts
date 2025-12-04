// Reference Original: https://github.com/AdobeDocs/uxp-premiere-pro/blob/main/src/pages/ppro_reference/types.d.ts

export declare type premierepro = {
  AppPreference: AppPreferenceStatic;
  AudioClipTrackItem: AudioClipTrackItemStatic;
  AudioComponentChain: AudioComponentChainStatic;
  AudioFilterComponent: AudioFilterComponentStatic;
  AudioFilterFactory: AudioFilterFactoryStatic;
  AudioTrack: AudioTrackStatic;
  CaptionTrack: CaptionTrackStatic;
  ClipProjectItem: ClipProjectItemStatic;
  EncoderManager: EncoderManagerStatic;
  Exporter: ExporterStatic;
  FolderItem: FolderItemStatic;
  FrameRate: FrameRateStatic;
  Guid: GuidStatic;
  Keyframe: KeyframeStatic;
  Marker: MarkerStatic;
  Markers: MarkersStatic;
  Metadata: MetadataStatic;
  OperationCompleteEvent: OperationCompleteEventStatic;
  Project: ProjectStatic;
  ProjectClosedEvent: ProjectClosedEventStatic;
  ProjectEvent: ProjectEventStatic;
  ProjectItem: ProjectItemStatic;
  ProjectSettings: ProjectSettingsStatic;
  ProjectUtils: ProjectUtilsStatic;
  Properties: PropertiesStatic;
  ScratchDiskSettings: ScratchDiskSettingsStatic;
  Sequence: SequenceStatic;
  SequenceEditor: SequenceEditorStatic;
  SequenceSettings: SequenceSettingsStatic;
  SequenceUtils: SequenceUtilsStatic;
  SnapEvent: SnapEventStatic;
  SourceMonitor: SourceMonitorStatic;
  TextSegments: TextSegmentsStatic;
  TickTime: TickTimeStatic;
  TrackItemSelection: TrackItemSelectionStatic;
  TransitionFactory: TransitionFactoryStatic;
  UniqueSerializeable: UniqueSerializeableStatic;
  Utils: UtilsStatic;
  VideoClipTrackItem: VideoClipTrackItemStatic;
  VideoComponentChain: VideoComponentChainStatic;
  VideoFilterComponent: VideoFilterComponentStatic;
  VideoFilterFactory: VideoFilterFactoryStatic;
  VideoTrack: VideoTrackStatic;
  VideoTransition: VideoTransitionStatic;
  EventManager: EventManagerStatic;
  Transcript: TranscriptStatic;
  AddTransitionOptions: AddTransitionOptions;
  Constants: typeof Constants;
};

export declare type Action = {};

export declare type AddTransitionOptions = {
  (): AddTransitionOptions;
  setApplyToStart(applyToStart: boolean): AddTransitionOptions; //Set whether to apply transition to the start or end of trackitem
  setForceSingleSided(forceSingleSided: boolean): AddTransitionOptions; //Set whether transition should be applied to one/both sides
  setTransitionAlignment(transitionAlignment: number): AddTransitionOptions; //Sets the transitionAlignment of the transition
  setDuration(tickTime: TickTime): AddTransitionOptions; //Sets the duration of transition
  applyToStart: boolean; //Get whether to apply transition to the start or end of trackitem
  forceSingleSided: boolean; //Get whether transition should be applied to one/both sides
  transitionAlignment: number; //Gets the transitionAlignment of transition
  duration: TickTime; //Gets the duration of transition
};

export declare type AppPreferenceStatic = {
  setValue(
    key: Constants.PreferenceKey,
    value: boolean | string | number,
    persistenceFlag: Constants.PropertyType,
  ): boolean; //Set backend preference using given list of property keys. The parameters are <key, value (number, boolean or string), persistence flag>
  getValue(preferenceKey: Constants.PreferenceKey): string; //Get preference value in native string form
  KEY_AUTO_PEAK_GENERATION: string; //Preference string key used to modify auto-peak generation settings
  KEY_IMPORT_WORKSPACE: string; //Preference string key used to modify import workspace settings
  KEY_SHOW_QUICKSTART_DIALOG: string; //Preference string key used to modify show quickstart dialog settings
  PROPERTY_PERSISTENT: number; //Property is persistent in backend and shared across cloud project.
  PROPERTY_NON_PERSISTENT: number; //Property is not persisted and will be cleared when the project closes.
};

export declare type AppPreference = {};

export declare type Application = {
  version: string;
};

export declare type AudioClipTrackItemStatic = {
  TRACKITEMTYPE_EMPTY: number; //Empty Track Item Type
  TRACKITEMTYPE_CLIP: number; //Clip Track Item Type
  TRACKITEMTYPE_TRANSITION: number; //Transition Track Item Type
  TRACKITEMTYPE_PREVIEW: number; //Previe Track Item Type
  TRACKITEMTYPE_FEEDBACK: number; //Feedback Track Item Type
};

export declare type AudioClipTrackItem = {
  getMatchName(): Promise<string>; //Returns the value of internal matchname for this trackItem
  getName(): Promise<string>; //Returns the display name for trackItem
  getIsSelected(): Promise<boolean>; //Returns if trackItem is selected or not
  getSpeed(): Promise<number>; //Returns the value of speed of the trackItem
  isAdjustmentLayer(): Promise<boolean>; //Returns true if the trackitem is an adjustment layer
  isSpeedReversed(): Promise<number>; //Returns true if the trackitem is reversed
  createMoveAction(tickTime: TickTime): Action; //Returns an action that moves the inPoint of the track item to a new time, by shifting it by a number of seconds.
  getInPoint(): Promise<TickTime>; //Returns a TickTime object representing the track item in point relative to the start time of the project item referenced by this track item.
  getOutPoint(): Promise<TickTime>; //Returns a TickTime object representing the track item out point relative to the start time of the project item referenced by this track item.
  createSetInPointAction(tickTime: TickTime): Action; //Create SetInPointAction for setting the track item in point relative to the start time of the project item referenced by this track item
  createSetOutPointAction(tickTime: TickTime): Action; //Create SetOutPointAction for setting the track item out point relative to the start time of the project item referenced by this track item
  getStartTime(): Promise<TickTime>; //Returns a TickTime object representing the starting sequence time of this track item relative to the sequence start time.
  getEndTime(): Promise<TickTime>; //Returns a TickTime object representing the ending sequence time of this track item relative to the sequence start time.
  createSetStartAction(tickTime: TickTime): Action; //Create set start time action for sequence
  createSetEndAction(tickTime: TickTime): Action; //Create set end time action for sequence
  getDuration(): Promise<TickTime>; //Returns timecode representing the duration of this track item relative to the sequence start.
  getType(): Promise<number>; //Index representing the type of this track item.
  isDisabled(): Promise<boolean>; //Returns true if trackitem is muted/disabled
  createSetDisabledAction(disabled: boolean): Action; //Returns an action that enables/disables the trackItem
  createSetNameAction(inName: string): Action; //Returns an action that renames the trackItem
  getMediaType(): Promise<Guid>; //Returns UUID representing the underlying media type of this track item
  getTrackIndex(): Promise<number>; //Index representing the track index of the track this track item belongs to
  getProjectItem(): Promise<ProjectItem>; //Returns the project item for this track item.
  getComponentChain(): Promise<AudioComponentChain>; //Returns AudioComponentChain
};

export declare type AudioComponentChainStatic = {};

export declare type AudioComponentChain = {
  createInsertComponentAction(
    component: Component | AudioFilterComponent,
    componentInsertionIndex: number,
  ): Action; //Creates and returns an insert component action
  createAppendComponentAction(
    component: Component | AudioFilterComponent,
  ): Action; //Creates and returns an append component action
  createRemoveComponentAction(
    component: Component | AudioFilterComponent,
  ): Action; //Creates and returns an remove component action
  getComponentAtIndex(componentIndex: number): Component; //Returns the component at the given index
  getComponentCount(): number; //Gets the number of components in the component chain
};

export declare type AudioFilterComponentStatic = {};

export declare type AudioFilterComponent = {};

export declare type AudioFilterFactoryStatic = {
  createComponentByDisplayName(
    displayName: string,
    inAudioClipTrackItem: AudioClipTrackItem,
  ): Promise<AudioFilterComponent>; //Creates a new audio filter component based on the input display name and trackItem for applying the audio filter
  getDisplayNames(): Promise<string[]>; //Returns an array of audio filter displayNames
};

export declare type AudioFilterFactory = {};

export declare type AudioTrackStatic = {
  EVENT_TRACK_CHANGED: string; //Event Object for Track changed
  EVENT_TRACK_INFO_CHANGED: string; //Event Object for Track Info Changed
  EVENT_TRACK_LOCK_CHANGED: string; //Event Object for Track Lock Changed
};

export declare type AudioTrack = {
  setMute(mute: boolean): Promise<boolean>; //sets the mute state of the track to muted/unmuted
  getMediaType(): Promise<Guid>; //UUID representing the underlying media type of this track
  getIndex(): Promise<number>; //Index representing the track index of this track within the track group.
  isMuted(): Promise<boolean>; //Get mute state of the track
  getTrackItems(
    trackItemType: Constants.TrackItemType,
    includeEmptyTrackItems: boolean,
  ): AudioClipTrackItem[]; //Returns array of AudioClipTrackItem from the track item type
  name: string; //Get the name of the track
  id: number; //The ID of the track within the TrackGroup
};

export declare type CaptionTrackStatic = {};

export declare type CaptionTrack = {
  setMute(mute: boolean): Promise<boolean>; //sets the mute state of the track to muted/unmuted
  getMediaType(): Promise<Guid>; //UUID representing the underlying media type of this track
  getIndex(): Promise<number>; //Index representing the track index of this track within the track group.
  isMuted(): Promise<boolean>; //Get mute state of the track
  getTrackItems(trackItemType: number, includeEmptyTrackItems: boolean): []; //Returns the track items of the specified media type from the given track
  name: string; //Get the name of the track
  id: number; //The ID of the track within the TrackGroup
};

export declare type ClipProjectItemStatic = {
  cast(projectItem: ProjectItem): ClipProjectItem; //Cast ProjectItem in to ClipProjectItem
  TYPE_CLIP: number; //Project item type for clips.
  TYPE_BIN: number; //Project item type for bins/folders.
  TYPE_ROOT: number; //Project item type for the root container.
  TYPE_FILE: number; //Project item type for generic files.
  TYPE_STYLE: number; //Project item type for styles.
  TYPE_COMPOUND: number; //Project item type for compound clips.
};

export declare type ClipProjectItem = {
  getInputLUTID(): Promise<string>; //Get Guid of Input LUT overridden on media
  createSetInputLUTIDAction(stringLUTID: string): Action; //Create action for setting Guid of Input LUT on media. This applies for Video Clips only.
  isSequence(): Promise<boolean>; //Returns true if the project item is a sequence
  canChangeMediaPath(): Promise<boolean>; //Returns true if Premiere Pro can change the path associated with this project item; otherwise, returns false
  isOffline(): Promise<boolean>; //Returns true if the media is offline
  canProxy(): Promise<boolean>; //Indicates whether it is possible to attach a proxy to this project item.
  getProxyPath(): Promise<string>; //Returns the proxy path if the project item has a proxy attached
  hasProxy(): Promise<boolean>; //Indicates whether a proxy has already been attached to the project item.
  attachProxy(
    mediaPath: string,
    isHiRes: boolean,
    inMakeAlternateLinkInTeamProjects?: boolean,
  ): Promise<boolean>; //Attach proxy or high resolution footage to projectItem and returns true if successful. Not undoable.
  findItemsMatchingMediaPath(
    matchString: string,
    ignoreSubclips?: boolean,
  ): Promise<ProjectItem[]>; //Returns array of project's items with media paths containing match string
  refreshMedia(): Promise<boolean>; //Updates representation of the media associated with the project item
  createSetOfflineAction(): Action; //Returns an action which sets the media offline
  getFootageInterpretation(): Promise<FootageInterpretation>; //Get the footage interpretation object for project item
  createSetFootageInterpretationAction(
    footageInterpretation: FootageInterpretation,
  ): Action; //Set the footage interpretation object for project item
  changeMediaFilePath(
    newPath: string,
    overrideCompatibilityCheck?: boolean,
  ): Promise<boolean>; //Change media file path of projectItem and returns true if successful. Not undoable.
  isMergedClip(): Promise<boolean>; //Returns true if the clip Project item is a merged clip
  isMulticamClip(): Promise<boolean>; //Returns true if the clip Project item is a multicam clip
  getEmbeddedLUTID(): Promise<string>; //Get GUID of LUT embedded in media
  createSetScaleToFrameSizeAction(): Action; //Returns an action which sets the scale to frame to true
  createSetNameAction(inName: string): Action; //Returns action that renames projectItem
  getColorLabelIndex(): Promise<number>; //Get color label index of projectItem
  createSetColorLabelAction(inColorLabelIndex: number): Action; //Create an action for set color label to projectItem by index
  getProject(): Promise<Project>; //Get the parent Project of this projectItem.
  getContentType(): Promise<Constants.ContentType>; //Get content type of the Project item
  getSequence(): Promise<Sequence>; //Get the sequence of the Project item
  getInPoint(mediaType: Constants.MediaType): Promise<TickTime>; //Get the in point of the Project item
  getOutPoint(mediaType: Constants.MediaType): Promise<TickTime>; //Get the out point of the Project item
  getMediaFilePath(): Promise<string>; //Get the media file path of the Project item.
  getComponentChain(mediaType: Constants.MediaType): Promise<string>; //Get the media file path of the Project item.
  createSetInPointAction(tickTime: TickTime): Action; //Returns an action which Sets the in point of the Project item
  createSetOverridePixelAspectRatioAction(
    inNumerator: number,
    inDenominator: number,
  ): Action; //Returns an action which sets Override pixel aspect ratio
  createSetOverrideFrameRateAction(inOverriddenFrameRateValue: number): Action; //Returns an action which sets the override frame rate
  createSetOutPointAction(tickTime: TickTime): Action; //Returns an action which Sets the in point of the Project item
  createSetInOutPointsAction(inPoint: TickTime, outPoint: TickTime): Action; //Set the in or out point of the Project item
  createClearInOutPointsAction(): Action; //Create Clear the in or out point of the Project item action
  getMedia(): Promise<Media>; //Return media associated with clipProjectItem
  type: number; //Get the type of the Project Item.
  name: string; //The name of this project item.
};

export declare type CloseProjectOptions = {
  (): CloseProjectOptions;
  setPromptIfDirty(promptIfDirty: boolean): CloseProjectOptions; //Set whether to prompt if a project is dirty on project open/close
  setShowCancelButton(showCancelButton: boolean): CloseProjectOptions; //Set whether to show the cancel button on project open/close
  setIsAppBeingPreparedToQuit(
    isAppBeingPreparedToQuit: boolean,
  ): CloseProjectOptions; //Set whether the app should be prepared to quit when open/closing a project
  setSaveWorkspace(isAppBeingPreparedToQuit: boolean): CloseProjectOptions; //Set whether to save your workspaces when opening/closing a project
  promptIfDirty: boolean; //Get whether a prompt is shown if a project is dirty on project open/close
  showCancelButton: boolean; //Get whether the cancel button is shown on project open/close
  isAppBeingPreparedToQuit: boolean; //Get whether the app is prepared to quit when open/closing a project
  saveWorkspace: boolean; //Get whether your workspaces are saved when opening/closing a project
};

export declare type Color = {
  (red?: number, green?: number, blue?: number, alpha?: number): Color;
  equals(colorObject: Color): boolean; //Returns true if the given ColorObject is equal to this ColorObject
  red: number; //Read/Write property to get/set red value of color object
  green: number; //Read/Write property to get/set green value of color object
  blue: number; //Read/Write property to get/set blue value of color object
  alpha: number; //Read/Write property to get/set alpha value of color object
};

export declare type Component = {
  getParam(paramIndex?: number): ComponentParam; //Get a parameter from the component based on the given input index. Parameter indexes are zero-based, and the actual is defined exclusively by the component itself.
  getMatchName(): Promise<string>; //Returned Promise will be fullfilled with the value of internal matchname for this component
  getDisplayName(): Promise<string>; //Returned Promise will be fullfilled with the value of display name for this component
  getParamCount(): number; //Gets the number of param in the component
};

export declare type ComponentParam = {
  createKeyframe(inValue: number | string | boolean | PointF | Color): Keyframe; //Creates and returns a keyframe initialised with the ComponentParam's type and passed in value. This throws if the passed in value is not compatible with the component param type
  getValueAtTime(
    time: TickTime,
  ): Promise<number | string | boolean | PointF | Color>; //Gets the value of component Param at the given time
  findNearestKeyframe(inTime: TickTime, outTime: TickTime): Keyframe; //Find sthe nearest key for the given time
  findNextKeyframe(inTime: TickTime): Keyframe; //find the next keyframe for the given time
  findPreviousKeyframe(inTime: TickTime): Keyframe; //find the previous keyframe for the given time
  createRemoveKeyframeAction(inTime: TickTime, UpdateUI?: boolean): Action; //Returns an action which removes keyframe at specific time
  createRemoveKeyframeRangeAction(
    inTime: TickTime,
    outTime: TickTime,
    UpdateUI?: boolean,
  ): Action; //Returns an action which removes keyframe at specific time range
  createSetValueAction(
    inKeyFrame: Keyframe,
    inSafeForPlayback?: boolean,
  ): Action; //Creates and returns an action object which can be used to set the value of a non-time varying component
  createAddKeyframeAction(inKeyFrame: Keyframe): Action; //Creates and returns an action object which can be used to add a keyframe component
  createSetTimeVaryingAction(inTimeVarying: boolean): Action; //Creates and returns an action object to set the component to be time varying
  getStartValue(): Promise<Keyframe>; //Returned promise will be fullfilled with the start value (keyframe) of the component param
  getKeyframeListAsTickTimes(): TickTime[]; //Get a list of tickTime for the keyframes of this component param
  getKeyframePtr(time?: TickTime): Keyframe; //Get the Keyframe at the given tickTime postion
  isTimeVarying(): boolean; //Returns true if the parameter value varies over time (for the duration of the item)
  createSetInterpolationAtKeyframeAction(
    inTime: TickTime,
    InterpolationMode: number,
    UpdateUI?: boolean,
  ): Action; //Returns an action which sets the interpolation mode of keyframe at the given time
  areKeyframesSupported(): Promise<boolean>; //Returns bool whether keyframes are supported for this component parameter
  displayName: string; //Returns the display name of the component param
};

export declare type CompoundAction = {
  addAction(action: Action): boolean; //Add an action to the compound action
  empty: boolean; //Is the compound action empty?
};

export declare type EncoderManagerStatic = {
  getManager(): EncoderManager; //Get the Encoder Manager object.
  getExportFileExtension(
    sequence: Sequence,
    presetFilePath: string,
  ): Promise<string>; //Get the Export File Extension of Input Preset file
  EXPORT_QUEUE_TO_AME: string; //Export type used to queue an export job into the Adobe Media Encoder export queue
  EXPORT_QUEUE_TO_APP: string; //Export type used to queue an export job into the app export queue
  EXPORT_IMMEDIATELY: string; //Export type used to immediately exporting an object
  EVENT_RENDER_COMPLETE: string; //Broadcast when AME is finished rendering
  EVENT_RENDER_ERROR: string; //Broadcast when AME gives back error message
  EVENT_RENDER_CANCEL: string; //Broadcast when AME job is canceled
  EVENT_RENDER_QUEUE: string; //Broadcast when AME job is queued
  EVENT_RENDER_PROGRESS: string; //Broadcast when AME job is rendering the job
};

export declare type EncoderManager = {
  exportSequence(
    sequence: Sequence,
    exportType: Constants.ExportType,
    outputFile?: string,
    presetFile?: string,
    exportFull?: boolean,
  ): Promise<boolean>; //Export a sequence. If no output file and preset is specified, the sequence will be exported with the applied export settings or standard export rules will be applied.
  encodeProjectItem(
    clipProjectItem: ClipProjectItem,
    outputFile: string,
    presetFile: string,
    workArea?: number,
    removeUponCompletion?: boolean,
    startQueueImmediately?: boolean,
  ): Promise<boolean>; //Encode input clipProjectItem in AME
  encodeFile(
    filePath: string,
    outputFile: string,
    presetFile: string,
    inPoint: TickTime,
    outPoint: TickTime,
    workArea?: number,
    removeUponCompletion?: boolean,
    startQueueImmediately?: boolean,
  ): Promise<boolean>; //Encode input media file in AME
  isAMEInstalled: boolean; //Check if AME is installed.
};

export declare type ExporterStatic = {
  exportSequenceFrame(
    sequence: Sequence,
    time: TickTime,
    filename: string,
    filepath: string,
    width: number,
    height: number,
  ): Promise<boolean>; //Exports from a sequence. Supported formats are bmp, dpx, gif, jpg, exr, png, tga and tif
};

export declare type Exporter = {};

export declare type FolderItemStatic = {
  cast(projectItem: ProjectItem): FolderItem; //Cast ProjectItem in to FolderItem
  TYPE_CLIP: number; //Project item type for clips.
  TYPE_BIN: number; //Project item type for bins/folders.
  TYPE_ROOT: number; //Project item type for the root container.
  TYPE_FILE: number; //Project item type for generic files.
  TYPE_STYLE: number; //Project item type for styles.
  TYPE_COMPOUND: number; //Project item type for compound clips.
};

export declare type FolderItem = {
  createBinAction(name: string, makeUnique: boolean): Action; //Returns an action that lets users create a new bin.
  createSmartBinAction(name: string, searchQuery: string): Action; //Creates a smart bin with given name and returns the Folder object
  createRenameBinAction(name: string): Action; //Rename the Bin and return true if it's successful
  getItems(): Promise<ProjectItem[]>; //Collection of child items of this folder.
  createRemoveItemAction(item: ProjectItem): Action; //Creates an action that removes the given item from this folder.
  createMoveItemAction(item: ProjectItem, newParent: FolderItem): Action; //Creates an action that moves the given item to the provided folder item newParent.
  createSetNameAction(inName: string): Action; //Returns action that renames projectItem
  getColorLabelIndex(): Promise<number>; //Get color label index of projectItem
  createSetColorLabelAction(inColorLabelIndex: number): Action; //Create an action for set color label to projectItem by index
  getProject(): Promise<Project>; //Get the parent Project of this projectItem.
  type: number; //Get the type of the Project Item.
  name: string; //The name of this project item.
};

export declare type FootageInterpretation = {
  getFrameRate(): number; //Get frame rate of footage
  setFrameRate(frameRate: number): boolean; //Set frame rate of footage
  getPixelAspectRatio(): number; //Get pixel aspect ratio of footage
  setPixelAspectRatio(pixelAspectRatio: number): boolean; //Set pixel aspect ratio of footage
  getFieldType(): number; //Get field type of footage
  setFieldType(fieldType: number): boolean; //Set field type of footage
  getRemovePullDown(): boolean; //Get removePullDown property of footage
  setRemovePullDown(removePulldown: boolean): boolean; //Set removePullDown property of footage
  getAlphaUsage(): number; //Get alpha usage type property of footage
  setAlphaUsage(alphaUsage: number): boolean; //Set alpha usage type property of footage
  getIgnoreAlpha(): boolean; //Get ignore alpha property of footage
  setIgnoreAlpha(ignoreAlpha: boolean): boolean; //Set ignore alpha property of footage
  getInvertAlpha(): boolean; //Get invert alpha property of footage
  setInvertAlpha(invertAlpha: boolean): boolean; //Set invert alpha property of footage
  getVrConform(): number; //Get vr conform projection type of footage
  setVrConform(vrConform: number): boolean; //Set vr conform projection type of footage
  getVrLayout(): number; //Get vr layout type of footage
  setVrLayout(vrLayOut: number): boolean; //Set vr layout type of footage
  getVrHorzView(): number; //Get vr horizontal view of footage
  setVrHorzView(vrHorzView: number): boolean; //Set vr horizontal view of footage
  getVrVertView(): number; //Get vr vertical view of footage
  setVrVertView(vrVertView: number): boolean; //Set vr horizontal view of footage
  getInputLUTID(): string; //Get input LUTID of footage
  setInputLUTID(inputLUTID: string): boolean; //Set input LUTID of footage
  ALPHACHANNEL_NONE: number; //alpha channel none
  ALPHACHANNEL_STRAIGHT: number; //alpha channel straight
  ALPHACHANNEL_PREMULTIPLIED: number; //alpha channel premultiplied
  ALPHACHANNEL_IGNORE: number; //alpha channel ignore
  FIELD_TYPE_DEFAULT: number; //default filed type invalid
  FIELD_TYPE_PROGRESSIVE: number; //field type progressive
  FIELD_TYPE_UPPERFIRST: number; //field type upperfirst
  FIELD_TYPE_LOWERFIRST: number; //field type lowerfirst
};

export declare type FrameRateStatic = {
  createWithValue(value: number): FrameRate; //Create frame rate object with a value
};

export declare type FrameRate = {
  (): FrameRate;
  equals(frameRate: FrameRate): boolean; //Returns true if the given FrameRate is equal to this FrameRate object
  ticksPerFrame: number; //Read/Write property to get/set ticks per frame.
  value: number; //Get the number of frames per second.
};

export declare type GuidStatic = {
  fromString(stringValue: string): Guid; //Create a guid from a string
};

export declare type Guid = {
  (): Guid;
  toString(): string; //Return string representation of the GUID
};

export declare type IngestSettings = {
  getIsIngestEnabled(): Promise<boolean>; //Get whether or not ingest is enabled
  setIngestEnabled(enabled: boolean): Promise<boolean>; //Set whether or not ingest is enabled
};

export declare type KeyframeStatic = {
  INTERPOLATION_MODE_LINEAR: number; //Linear interpolation mode
  INTERPOLATION_MODE_HOLD: number; //Hold interpolation mode
  INTERPOLATION_MODE_BEZIER: number; //Bezier interpolation mode
  INTERPOLATION_MODE_TIME: number; //Time interpolation mode
  INTERPOLATION_MODE_TIME_TRANSITION_START: number; //Time transition start interpolation mode
  INTERPOLATION_MODE_TIME_TRANSITION_END: number; //Time transition end interpolation mode
};

export declare type Keyframe = {
  getTemporalInterpolationMode(): Promise<number>; //Gets temporal interpolation mode of a keyframe
  setTemporalInterpolationMode(
    temporalInterpolationMode: number,
  ): Promise<boolean>; //Sets temporal interpolation mode of a keyframe
  value: { value: string | number | boolean | Color | PointF };
  position: TickTime; //Get/Set position of a keyframe
};

export declare type MarkerStatic = {
  MARKER_TYPE_COMMENT: string; //Marker Type: Comment
  MARKER_TYPE_CHAPTER: string; //Marker Type: Chapter
  MARKER_TYPE_FLVCUEPOINT: string; //Marker Type: FLVCuePoint
  MARKER_TYPE_WEBLINK: string; //Marker Type: WebLink
};

export declare type Marker = {
  getColor(): Color; //Get color code of the marker.
  getColorIndex(): number; //Get color index of the marker.
  getComments(): string; //Get comments of the marker.
  getDuration(): TickTime; //Get duration time of the marker.
  getName(): string; //Get name of the marker.
  getUrl(): string; //Get url of the marker.
  getTarget(): string; //Get target of the marker. Used together with url for web targets.
  getType(): string; //Get type of the marker. e.g. Cue / Track / Subclip / Cart
  getStart(): TickTime; //Get start time of the marker.
  createSetColorByIndexAction(colorIndex: number): Action; //Return an action to set the color of the marker by the color index
  createSetNameAction(name: string): Action; //Return an action to set the name of the marker.
  createSetDurationAction(tickTime: TickTime): Action; //Return an action to set the duration of the marker.
  createSetTypeAction(markerType: string): Action; //Return an action to set the type of the marker.
  createSetCommentsAction(comments: string): Action; //Return an action to set the comments of the marker.
};

export declare type MarkersStatic = {
  getMarkers(markerOwnerObject: Sequence | ClipProjectItem): Promise<Markers>; //Returns the Markers object for Sequence Or ProjectItem
};

export declare type Markers = {
  getMarkers(filters?: string[]): Marker[]; //Get all markers
  createRemoveMarkerAction(marker: Marker): Action; //Remove the given marker
  createMoveMarkerAction(marker: Marker, tickTime: TickTime): Action; //Move the given marker at new time value
  createAddMarkerAction(
    Name: string,
    markerType?: string,
    startTime?: TickTime,
    duration?: TickTime,
    comments?: string,
  ): Action; //Add a new marker
};

export declare type Media = {
  createSetStartAction(time: TickTime): Action; //Returns action that set start of media
  start: TickTime; //Get the media start time
  duration: TickTime; //Get the media duration
};

export declare type MetadataStatic = {
  getProjectMetadata(projectItem: ProjectItem): Promise<string>; //Get project metadata
  getXMPMetadata(projectItem: ProjectItem): Promise<string>; //Get project XMP metadata
  createSetProjectMetadataAction(
    projectItem: ProjectItem,
    metadata: string,
    updatedFields: string[],
  ): Action; //Get set project metadata action
  createSetXMPMetadataAction(
    projectItem: ProjectItem,
    metadata: string,
  ): Action; //Get set project XMP metadata action
  addPropertyToProjectMetadataSchema(
    name: string,
    label: string,
    type: number,
  ): Promise<boolean>; //Add name and label property to project metadata schema
  getProjectColumnsMetadata(projectItem: ProjectItem): Promise<string>; //Get project column metadata from project item
  getProjectPanelMetadata(): Promise<string>; //Get project panel metadata
  setProjectPanelMetadata(metadata: string): Promise<boolean>; //Set project panel metadata
  METADATA_TYPE_INTEGER: number; //Metadata Type: INTEGER
  METADATA_TYPE_REAL: number; //Metadata Type: REAL
  METADATA_TYPE_TEXT: number; //Metadata Type: TEXT
  METADATA_TYPE_BOOLEAN: number; //Metadata Type: BOOLEAN
};

export declare type Metadata = {};

export declare type OpenProjectOptions = {
  setShowConvertProjectDialog(
    showConvertProjectDialog: boolean,
  ): OpenProjectOptions; //Set whether to show the convert project dialog on project open/close
  setShowLocateFileDialog(showLocateFileDialog: boolean): OpenProjectOptions; //Set whether to show the locate file dialog on project open/close
  setShowWarningDialog(showConvertProjectDialog: boolean): OpenProjectOptions; //Set whether to show the warning file dialog on project open/close
  setAddToMRUList(addToMRUList: boolean): OpenProjectOptions; //Set whether to add to MRU list after project changes
  showConvertProjectDialog: boolean; //Get whether the convert project dialog is shown on project open/close
  showLocateFileDialog: boolean; //Get whether locate file dialog is shown on project open/close
  showWarningDialog: boolean; //Get whether the warning file dialog is shown on project open/close
  addToMRUList: boolean; //Get whether to add project changes to MRU list
};

export declare type OperationCompleteEventStatic = {
  OPERATION_STATE_SUCCESS: number; //Represents the state when an operation completes successfully.
  OPERATION_STATE_CANCELLED: number; //Represents the state when an operation is cancelled.
  OPERATION_STATE_FAILED: number; //Represents the state when an operation is failed.
  EVENT_IMPORT_MEDIA_COMPLETE: string; //Event occurs when a media import operation is complete.
  EVENT_EXPORT_MEDIA_COMPLETE: string; //Event occurs when a media export operation is complete.
  EVENT_EFFECT_DROP_COMPLETE: string; //Event occurs when an effect is dropped on a trackitem
  EVENT_EFFECT_DRAG_OVER: string; //Event occurs when an effect is drag over a trackitem
  EVENT_CLIP_EXTEND_REACHED: string; //Event occurs when a clip reached its maximum extend limit.
  EVENT_GENERATIVE_EXTEND_COMPLETE: string; //Event occurs when a generative extend operation is complete.
};

export declare type OperationCompleteEvent = {
  state: number; //Indicates the outcome of a completed operation: Success, Cancelled, or Failed.
};

export declare type PointF = {
  (x?: number, y?: number): PointF;
  distanceTo(point: PointF): number; //Get the distance from one point to another point
  x: number; //Get/Set the x value of a point
  y: number; //Get/Set the y value of a point
};

export declare type PointKeyframe = {
  value: { value: PointF };
  position: TickTime; //Get/Set position of a keyframe
};

export declare type ProjectStatic = {
  createProject(path: string): Promise<Project>; //Create a new project
  open(path: string, openProjectOptions?: OpenProjectOptions): Promise<Project>; //Open a project
  getActiveProject(): Promise<Project>; //Currently active project.
  getProject(projectGuid: Guid): Project; //Get project referenced by given UID
};

export declare type Project = {
  getActiveSequence(): Promise<Sequence>; //Get the active sequence of the project
  setActiveSequence(sequence: Sequence): Promise<boolean>; //Set the active sequence of the project
  createSequence(name: string, presetPath?: string): Promise<Sequence>; //Create a new sequence with the default preset path - Parameter presetPath is deprecated, instead use createSequenceWithPresetPath()
  createSequenceFromMedia(
    name: string,
    clipProjectItems?: ClipProjectItem[],
    targetBin?: ProjectItem,
  ): Promise<Sequence>; //Create a new sequence with a given name and medias
  getColorSettings(): Promise<ProjectColorSettings>; //Get project color settings object
  deleteSequence(sequence: Sequence): Promise<boolean>; //Delete a given sequence from the project
  getInsertionBin(): Promise<ProjectItem>; //Get current insertion bin
  openSequence(sequence: Sequence): Promise<boolean>; //Open a sequence and return true if successful.
  importSequences(projectPath: string, sequenceIds?: Guid[]): Promise<boolean>;
  importAEComps(
    aepPath: string,
    compNames: string[],
    TargetBin?: ProjectItem,
  ): Promise<boolean>;
  importAllAEComps(aepPath: string, TargetBin?: ProjectItem): Promise<boolean>;
  importFiles(
    filePaths: string[],
    suppressUI?: boolean,
    targetBin?: ProjectItem,
    asNumberedStills?: boolean,
  ): Promise<boolean>; //Import files in root/target bin of the project
  close(closeProjectOptions?: CloseProjectOptions): Promise<boolean>; //Close a project
  save(): Promise<boolean>; //Save the project
  saveAs(path: string): Promise<boolean>; //Save the project at the provided path
  getSequence(guid: Guid): Sequence; //Get sequence by id from the project
  getSequences(): Promise<Sequence[]>; //Get an array of all sequences in this project.
  getRootItem(): Promise<FolderItem>; //The root item of the project which contains all items of the project on the lowest level.
  pauseGrowing(pause: boolean): Promise<boolean>; //Pause growing of files instead swap the files
  executeTransaction(
    callback: (compoundAction: CompoundAction) => void,
    undoString?: string,
  ): boolean; //Execute undoable transaction by passing compound action
  lockedAccess(callback: () => void): void; //Get a read/upgrade locked access to Project, project state will not change during the execution of callback function. Can call executeTransaction while having locked access.
  guid: Guid; //The unique identifier of the project.
  name: string; //The project name.
  path: string; //The absolute file path to the project file.
};

export declare type ProjectClosedEventStatic = {
  EVENT_CLOSED: string; //Event occurs when project was closed.
};

export declare type ProjectClosedEvent = {
  name: string; //The project name.
  path: string; //The absolute file path to the project file.
  id: string; //The unique identifier of the project.
};

export declare type ProjectColorSettings = {
  getSupportedGraphicsWhiteLuminances(): Promise<number[]>; //Get all the graphics white luminance as array of values
  getGraphicsWhiteLuminance(): Promise<number>; //Get the graphics white luminance value
};

export declare type ProjectEventStatic = {
  EVENT_OPENED: string; //Event occurs when project was opened.
  EVENT_ACTIVATED: string; //Event occurs when the active project has changed
  EVENT_DIRTY: string; //Event occurs when the project dirty state changed.
};

export declare type ProjectEvent = {
  name: string; //The project name.
  path: string; //The absolute file path to the project file.
  id: string; //The unique identifier of the project.
  project: Project; //The project object.
};

export declare type ProjectItemStatic = {
  cast(item: FolderItem | ClipProjectItem): ProjectItem; //Cast FolderItem or ClipProjectItem in to ProjectItem
  TYPE_CLIP: number; //Project item type for clips.
  TYPE_BIN: number; //Project item type for bins/folders.
  TYPE_ROOT: number; //Project item type for the root container.
  TYPE_FILE: number; //Project item type for generic files.
  TYPE_STYLE: number; //Project item type for styles.
  TYPE_COMPOUND: number; //Project item type for compound clips.
};

export declare type ProjectItem = {
  createSetNameAction(inName: string): Action; //Returns action that renames projectItem
  getColorLabelIndex(): Promise<number>; //Get color label index of projectItem
  createSetColorLabelAction(inColorLabelIndex: number): Action; //Create an action for set color label to projectItem by index
  getProject(): Promise<Project>; //Get the parent Project of this projectItem.
  getId(): string; //Get id of projectItem
  getParentBin(): FolderItem; //Get parent FolderItem of projectItem
  type: number; //Get the type of the Project Item.
  name: string; //The name of this project item.
};

export declare type ProjectItemSelection = {
  getItems(): Promise<ProjectItem[]>; //Get the project items that is represented by this selection.
};

export declare type ProjectSettingsStatic = {
  createSetScratchDiskSettingsAction(
    project: Project,
    scratchDiskSettings: ScratchDiskSettings,
  ): Action; //Returns an action which sets ScratchDiskSetting
  getScratchDiskSettings(project: Project): Promise<ScratchDiskSettings>; //Returns project ScratchDiskSettings
  getIngestSettings(project: Project): Promise<IngestSettings>; //Returns project ingest settings
  createSetIngestSettingsAction(
    project: Project,
    ingestSettings: IngestSettings,
  ): Action; //Returns an action which sets IngestSettings
};

export declare type ProjectSettings = {};

export declare type ProjectUtilsStatic = {
  getSelection(project: Project): Promise<ProjectItemSelection>; //Get array of selected project items in project view
  getProjectViewIds(): Promise<Guid[]>; //Get array of project view ids
  getProjectFromViewId(guid: Guid): Promise<Project>; //Get project based on input view guid
  getSelectionFromViewId(guid: Guid): Promise<ProjectItemSelection>; //Get array of selected projectItem based on input view guid
};

export declare type ProjectUtils = {};

export declare type PropertiesStatic = {
  getProperties(propertyOwnerObject: Project | Sequence): Promise<Properties>; //Return Property Owner Object
  PROPERTY_PERSISTENT: number; //Property is persistent in backend and shared across cloud project.
  PROPERTY_NON_PERSISTENT: number; //Property is not persisted and will be cleared when the project closes.
};

export declare type Properties = {
  getValueAsInt(name: string): number; //Get named value as integer number
  getValueAsFloat(name: string): number; //Get named value as float number
  getValueAsBool(name: string): boolean; //Get named value as boolean
  getValue(name: string): string; //Get named value in native string form
  createSetValueAction(
    name: string,
    value: boolean | string | number,
    persistenceFlag: Constants.PropertyType,
  ): Action; //Create an action to set a named value through scripting. The parameters are <name, value (number, boolean or string), persistence flag>. This method can fail if e.g. the underlying properties object does not support action based setting of properties.
  hasValue(name: string): boolean; //Check if a named value exists under this name.
  createClearValueAction(name: string): Action; //Create an action to clear the value with the given name. This method can fail if e.g. the underlying properties object does not support action based setting of properties.
};

export declare type RectF = {
  (): RectF;
  width: number; //Get/Set the width of a rect
  height: number; //Get/Set the height of a rect
};

export declare type ScratchDiskSettingsStatic = {
  FOLDERTYPE_CAPTURE: string; //Folder Type: CAPTURED
  FOLDERTYPE_VIDEO_PREVIEW: string; //Folder Type: VIDEOPREVIEW
  FOLDERTYPE_AUDIO_PREVIEW: string; //Folder Type: AUDIOPREVIEW
  FOLDERTYPE_AUTO_SAVE: string; //Folder Type: AUTOSAVE
  FOLDERTYPE_CCL_LIBRARIES: string; //Folder Type: CCLLIBRARIES
  FOLDERTYPE_CAPSULE_MEDIA: string; //Folder Type: CAPSULEMEDIA
  FOLDER_SAME_AS_PROJECT: string; //Folder: SAMEASPROJECT
  FOLDER_MY_DOCUMNETS: string; //Folder: MYDOCUMNETS
};

export declare type ScratchDiskSettings = {
  setScratchDiskPath(
    ScratchDiskType: Constants.ScratchDiskFolderType,
    ScratchDiskValue: Constants.ScratchDiskFolder,
  ): boolean; //Sets project ScratchDisk Path
  getScratchDiskPath(ScratchDiskType: Constants.ScratchDiskFolderType): string; //Gets the scratchDisk location for specific disktype - may return symbolic paths for reserved types like 'MyDocuments'
};

export declare type SequenceStatic = {};

export declare type Sequence = {
  getSequenceVideoTimeDisplayFormat(): Promise<TimeDisplay>; //Get video time display format of this sequence
  getSequenceAudioTimeDisplayFormat(): Promise<TimeDisplay>; //Get audio time display format of this sequence
  getPlayerPosition(): Promise<TickTime>; //Get the player's current position
  setPlayerPosition(positionTime?: TickTime): Promise<boolean>; //Set the player's current position
  clearSelection(): Promise<boolean>; //Clears TrackItem Selection
  setSelection(trackItemSelection: TrackItemSelection): Promise<boolean>; //Updates sequence selection using the given track item selection.
  getVideoTrackCount(): Promise<number>; //Get video track count from this sequence
  getAudioTrackCount(): Promise<number>; //Get audio track count from this sequence
  getCaptionTrackCount(): Promise<number>; //Get caption track count from this sequence
  getVideoTrack(trackIndex: number): Promise<VideoTrack>; //Get video track from track index
  getAudioTrack(trackIndex: number): Promise<AudioTrack>; //Get audio track from track index
  getCaptionTrack(trackIndex: number): Promise<CaptionTrack>; //Get caption track from track index
  getSettings(): Promise<SequenceSettings>; //Get sequence settings object
  createSetSettingsAction(sequenceSettings: SequenceSettings): Action; //Returns action that set sequence settings
  createCloneAction(): Action; //Creates an action to clone the given sequence
  createSubsequence(ignoreTrackTargeting?: boolean): Promise<Sequence>; //Returns a new sequence, which is a sub-sequence of the existing sequence
  isDoneAnalyzingForVideoEffects(): Promise<boolean>; //Returns whether or not the sequence is done analyzing for video effects
  getZeroPoint(): Promise<TickTime>; //Time representing the zero point of the sequence.
  getEndTime(): Promise<TickTime>; //Time representing the end of the sequence
  getInPoint(): Promise<TickTime>; //Get time representing the inPoint of sequence.
  getOutPoint(): Promise<TickTime>; //Get time representing the inPoint of sequence.
  createSetInPointAction(tickTime: TickTime): Action; //Create SetInPointAction for sequence
  createSetZeroPointAction(tickTime: TickTime): Action; //Create an action to set an InPoint for the sequence
  createSetOutPointAction(tickTime: TickTime): Action; //Create SetOutPointAction for sequence
  getProjectItem(): Promise<ProjectItem>; //Get the associated projectItem of the sequence.
  getSelection(): Promise<TrackItemSelection>; //Returns the current selection group of the sequence.
  getFrameSize(): Promise<RectF>; //Gets the size of the frame
  getTimebase(): Promise<string>; //Gets the time base of sequence
  guid: Guid; //The unique identifier of the sequence.
  name: string; //The sequence name.
};

export declare type SequenceEditorStatic = {
  getEditor(sequenceObject: Sequence): SequenceEditor; //Get Sequence Editor reference for editing the sequence timeline
  getInstalledMogrtPath(): Promise<string>; //Get local directory path to adobe mogrt files
};

export declare type SequenceEditor = {
  createRemoveItemsAction(
    trackItemSelection: TrackItemSelection,
    ripple: boolean,
    mediaType: Constants.MediaType,
    shiftOverLapping?: boolean,
  ): Action; //Create remove action for sequence
  createInsertProjectItemAction(
    projectItem: ProjectItem,
    time: TickTime,
    videoTrackIndex: number,
    audioTrackIndex: number,
    limitShift: boolean,
  ): Action; //Create insert ProjectItem into Sequence Action
  createOverwriteItemAction(
    projectItem: ProjectItem,
    time: TickTime,
    videoTrackIndex: number,
    audioTrackIndex: number,
  ): Action; //Create overwrite Sequence with ProjectItem Action
  createCloneTrackItemAction(
    trackItem: VideoClipTrackItem | AudioClipTrackItem,
    timeOffset: TickTime,
    videoTrackVerticalOffset: number,
    audioTrackVerticalOffset: number,
    alignToVideo: boolean,
    isInsert: boolean,
  ): Action; //Duplicate trackItem using an insert or overwrite edit method to a destination track. Target track and start time of trackItem is determined using an offset value from the original trackItem position.
  insertMogrtFromPath(
    inMGTPath: string,
    inTime: TickTime,
    inVideoTrackIndex: number,
    inAudioTrackIndex: number,
  ): (VideoClipTrackItem | AudioClipTrackItem)[]; //Insert input MGT into sequence with time and index defined
  insertMogrtFromLibrary(
    inLibraryName: string,
    inElementName: string,
    inTime: TickTime,
    inVideoTrackIndex: number,
    inAudioTrackIndex: number,
  ): (VideoClipTrackItem | AudioClipTrackItem)[]; //Insert input MGT into sequence with time and index defined
};

export declare type SequenceSettingsStatic = {
  PAR_SQUARE: string; //Square Pixels (1.0)
  PAR_DVNTSC: string; //DV NTSC (0.9091)
  PAR_DVNTSCWide: string; //DV NTSC Widescreen 16:9 (1.2121)
  PAR_DVPAL: string; //DV PAL (1.0940)
  PAR_DVPALWide: string; //DV PAL Widescreen 16:9 (1.4587)
  PAR_Anamorphic: string; //Anamorphic 2:1 (2.0)
  PAR_HDAnamorphic1080: string; //HD Anamorphic 1080 (1.333)
  PAR_DVCProHD: string; //DVCPRO HD (1.5)
  VIDEO_FIELDTYPE_PROGRESSIVE: number; //Video field type progressive
  VIDEO_FIELDTYPE_UPPER_FIRST: number; //Video field type upper first
  VIDEO_FIELDTYPE_LOWER_FIRST: number; //Video field type lower first
  VIDEO_DISPLAY_FORMAT_23976: number; //23.976 fps TimeCode
  VIDEO_DISPLAY_FORMAT_25: number; //25 fps TimeCode
  VIDEO_DISPLAY_FORMAT_2997: number; //29.97 fps TimeCode
  VIDEO_DISPLAY_FORMAT_2997_NON_DROP: number; //29.97 fps Non-Drop-Frame TimeCode
  VIDEO_DISPLAY_FORMAT_16mm: number; //Feet+Frame 16mm
  VIDEO_DISPLAY_FORMAT_35mm: number; //Feet+Frame 35mm
  VIDEO_DISPLAY_FORMAT_FRAMES: number; //Frames
  AUDIO_CHANNEL_TYPE_MONO: number; //Audio Channel Type Mono
  AUDIO_CHANNEL_TYPE_STEREO: number; //Audio Channel Type Stereo
  AUDIO_CHANNEL_TYPE_51: number; //Audio Channel Type 5.1
  AUDIO_CHANNEL_TYPE_MULTI: number; //Audio Channel Type Multi
  AUDIO_DISPLAY_FORMAT_SAMPLE_RATE: number; //Audio Display format: Audio Sample Timecode
  AUDIO_DISPLAY_FORMAT_MILISECONDS: number; //Audio Display format miliseconds
};

export declare type SequenceSettings = {
  getMaximumBitDepth(): Promise<boolean>; //Find if maximum bit depth is set
  setMaximumBitDepth(useMaxBitDepth: boolean): Promise<boolean>; //Set maximum bit depth to true/false
  getMaxRenderQuality(): Promise<boolean>; //Find if maximum render quality is set
  setMaxRenderQuality(useMaxRenderQuality: boolean): Promise<boolean>; //Set maximum render quality to true/false
  getAudioChannelCount(): Promise<number>; //Get number of channels in the sequence
  getAudioChannelType(): Promise<number>; //Get Audio channel type of sequence. Could be 0 (Mono), 1 (Stereo), 2 (5.1), or 3 (multichannel)
  getAudioDisplayFormat(): Promise<TimeDisplay>; //Get Audio display format
  setAudioDisplayFormat(audioDisplay: TimeDisplay): Promise<boolean>; //Set audio display format of sequence.
  getAudioSampleRate(): Promise<FrameRate>; //Get audio sample rate
  setAudioSampleRate(inRate: FrameRate): Promise<boolean>; //Set audio sample rate
  getVideoDisplayFormat(): Promise<TimeDisplay>; //Get Video display format
  setVideoDisplayFormat(audioDisplay: TimeDisplay): Promise<boolean>; //Set video display format of sequence
  getVideoFieldType(): Promise<number>; //Get video field type in the sequence
  setVideoFieldType(videoFiledType: number): Promise<boolean>; //Set video field type in sequence
  getVideoFrameRect(): Promise<RectF>; //Get video frame rect in the sequence
  setVideoFrameRect(inVideoFrameRect: RectF): Promise<boolean>; //Set video frame rect in sequence
  getVideoPixelAspectRatio(): Promise<string>; //Get Video display format
  setVideoPixelAspectRatio(inPixelAspectRatio: string): Promise<boolean>; //Set video display format of sequence
  getCompositeInLinearColor(): Promise<boolean>; //Get if composite in linear color is checked
  setCompositeInLinearColor(
    useCompositeInLinearColor: boolean,
  ): Promise<boolean>; //Set if composite in linear color is checked
  getEditingMode(): Promise<string>; //Get editing mode of sequence
  setEditingMode(inEditingModeName: string): Promise<boolean>; //Set editing mode of sequence
  getPreviewFileFormat(): Promise<string>; //Get preview file format of sequence
  setPreviewFileFormat(inPreviewCodec: string): Promise<boolean>; //Set preview file format of sequence
  getPreviewCodec(): Promise<string>; //Get preview codec of sequence
  setPreviewCodec(inPreviewCodec: string): Promise<boolean>; //Set preview codec of sequence
  getPreviewFrameRect(): Promise<RectF>; //Get preview video frame rect in the sequence
  setPreviewFrameRect(inPreviewVideoRect: RectF): Promise<boolean>; //Set preview video frame rect in sequence
};

export declare type SequenceUtilsStatic = {
  performSceneEditDetectionOnSelection(
    clipOperation: string,
    trackItemSelection: TrackItemSelection,
  ): Promise<boolean>; //Performs cut detection on the sequence selection
  SEQUENCE_OPERATION_APPLYCUT: string; //ApplyCuts
  SEQUENCE_OPERATION_CREATEMARKER: string; //CreateMarkers
  SEQUENCE_OPERATION_CREATESUBCLIP: string; //CreateSubclips
};

export declare type SequenceUtils = {};

export declare type SnapEventStatic = {
  EVENT_SNAP_TO_KEYFRAME: string; //Event occurs a user scrub on timeline over keyframes when shift key is applied.
  EVENT_SNAP_TO_TRACKITEM: string; //Event occurs a user scrub on timeline and snaps to various track item alignments.
  EVENT_SNAP_TO_GUIDES: string; //Event occurs object is snapped to guildelines when holding the Cmd/Ctrl key.
  EVENT_SNAP_RAZOR_TO_PLAYHEAD: string; //Event occurs when the razor tool hovers over the playhead and snaps into position for a cut.
  EVENT_SNAP_RAZOR_TO_MARKER: string; //Event occurs when the razor tool hovers over the all types of markers and snaps into position for a cut.
  EVENT_SNAP_PLAYHEAD_TO_TRACKITEM_EDGE: string; //Event occurs when the playhead snaps into track-item edges.
};

export declare type SnapEvent = {};

export declare type SourceMonitorStatic = {
  openFilePath(filePath: string): Promise<boolean>; //Open the item at the specified path and send to the Source Monitor for preview
  openProjectItem(projectItem: ProjectItem): Promise<boolean>; //Open input projectItem on Source Monitor
  closeClip(): Promise<boolean>; //Close clip on Source Monitor
  closeAllClips(): Promise<boolean>; //Close all clips on Source Monitor
  getPosition(): Promise<TickTime>; //Get position of source monitor in time
  play(speed?: number): Promise<boolean>; //Play clip at source monitor with input speed
  getProjectItem(): Promise<ProjectItem>; //Get projectItem at source monitor
};

export declare type SourceMonitor = {};

export declare type TextSegmentsStatic = {
  importFromJSON(
    json: string,
    callback1: (importedTranscription: TextSegments) => void,
  ): boolean; //Import text segments in JSON format for handling via callback.
};

export declare type TextSegments = {};

export declare type TickTimeStatic = {
  createWithFrameAndFrameRate(
    frameCount: number,
    frameRate: FrameRate,
  ): TickTime; //Constructs a TickTime object with a frame and a frame rate.
  createWithSeconds(seconds: number): TickTime; //Constructs a TickTime object with seconds.
  createWithTicks(ticks: string): TickTime; //Constructs a TickTime object with ticks as a string.
  TIME_ZERO: TickTime; //Zero Tick Time Constant
  TIME_ONE_SECOND: TickTime; //One Second Tick Time Constant
  TIME_ONE_MINUTE: TickTime; //One Second Tick Time Constant
  TIME_ONE_HOUR: TickTime; //One Hour Tick Time Constant
  TIME_MAX: TickTime; //Max Tick Time Constant
  TIME_MIN: TickTime; //Min Tick Time Constant
  TIME_INVALID: TickTime; //Invalid Tick Time Constant
};

export declare type TickTime = {
  (): TickTime;
  equals(tickTime: TickTime): boolean; //Returns true if the given TickTime is equal to the TickTime object
  alignToNearestFrame(frameRate: FrameRate): TickTime; //AlignToNearestFrame will return a TickTime that is aligned to the nearest frame boundary greater than or less than the given time, for a given frame rate by rounding any fractional portion.
  alignToFrame(frameRate: FrameRate): TickTime; //alignToFrame will return a TickTime that is aligned to the nearest frame boundary less than the given time, for a given frame rate by rounding any fractional portion.
  add(tickTime: TickTime): TickTime; //Add another TickTime to this one and return it. This TickTime is not modified.
  subtract(tickTime: TickTime): TickTime; //Subtract another TickTime from this one and return it. This TickTime is not modified.
  multiply(factor: number): TickTime; //Multiply this TickTime with a factor and return it. This TickTime is not modified.
  divide(divisor: number): TickTime; //Divide this TickTime by a divisor and return it. In case of a division by zero, TIME_INVALID is returned. This TickTime is not modified.
  seconds: number; //Get the TickTime in seconds
  ticks: string; //Get the TickTime in ticks as a string
  ticksNumber: number; //Get the TickTime in ticks as a number
};

export declare type TimeDisplay = {
  type: number; //Read/Write property to get/set the time display type numeric code
};

export declare type TrackItemSelectionStatic = {
  createEmptySelection(
    callback0: (selection: TrackItemSelection) => void,
  ): boolean; //Create empty selection
};

export declare type TrackItemSelection = {
  addItem(
    trackItem: VideoClipTrackItem | AudioClipTrackItem,
    skipDuplicateCheck?: boolean,
  ): boolean; //Add a track item to this selection
  removeItem(trackItem: VideoClipTrackItem | AudioClipTrackItem): boolean; //Remove a track item from this selection
  getTrackItems(): Promise<(VideoClipTrackItem | AudioClipTrackItem)[]>; //return list of trackItems inside of trackItemSelection
};

export declare type TransitionFactoryStatic = {
  createVideoTransition(matchName: string): VideoTransition; //Creates a new video filter component based on the input matchName
  getVideoTransitionMatchNames(): Promise<string[]>; //Return a promise which will be fullfilled with an array of video transition matchnames
};

export declare type TransitionFactory = {};

export declare type UniqueSerializeableStatic = {
  cast(
    item: ProjectItem | ClipProjectItem | FolderItem | Sequence,
  ): UniqueSerializeable; //Cast serializable object (ex. ProjectItem) into UniqueSerializeable
};

export declare type UniqueSerializeable = {
  getUniqueID(): Guid; //Get the unique ID of the serializeable object
};

export declare type UtilsStatic = {
  isAEInstalled(): Promise<boolean>; //Check if AE is installed.
};

export declare type Utils = {};

export declare type VideoClipTrackItemStatic = {
  TRACKITEMTYPE_EMPTY: number; //Empty Track Item Type
  TRACKITEMTYPE_CLIP: number; //Clip Track Item Type
  TRACKITEMTYPE_TRANSITION: number; //Transition Track Item Type
  TRACKITEMTYPE_PREVIEW: number; //Previe Track Item Type
  TRACKITEMTYPE_FEEDBACK: number; //Feedback Track Item Type
};

export declare type VideoClipTrackItem = {
  createAddVideoTransitionAction(
    videoTransition: VideoTransition,
    addTransitionOptionsProperties?: AddTransitionOptions,
  ): Action; //Create add transition action for sequence
  createRemoveVideoTransitionAction(
    transitionPosition?: Constants.TransitionPosition,
  ): Action; //Returns true if trackItem has transition
  getMatchName(): Promise<string>; //Returns the value of internal matchname for this trackItem
  getName(): Promise<string>; //Returns the display name for trackItem
  getIsSelected(): Promise<boolean>; //Returns if trackItem is selected or not
  getSpeed(): Promise<number>; //Returns the value of speed of the trackItem
  isAdjustmentLayer(): Promise<boolean>; //Returns true if the trackitem is an adjustment layer
  isSpeedReversed(): Promise<number>; //Returns true if the trackitem is reversed
  createMoveAction(tickTime: TickTime): Action; //Returns an action that moves the inPoint of the track item to a new time, by shifting it by a number of seconds.
  getInPoint(): Promise<TickTime>; //Returns a TickTime object representing the track item in point relative to the start time of the project item referenced by this track item.
  getOutPoint(): Promise<TickTime>; //Returns a TickTime object representing the track item out point relative to the start time of the project item referenced by this track item.
  createSetInPointAction(tickTime: TickTime): Action; //Create SetInPointAction for setting the track item in point relative to the start time of the project item referenced by this track item
  createSetOutPointAction(tickTime: TickTime): Action; //Create SetOutPointAction for setting the track item out point relative to the start time of the project item referenced by this track item
  getStartTime(): Promise<TickTime>; //Returns a TickTime object representing the starting sequence time of this track item relative to the sequence start time.
  getEndTime(): Promise<TickTime>; //Returns a TickTime object representing the ending sequence time of this track item relative to the sequence start time.
  createSetStartAction(tickTime: TickTime): Action; //Create set start time action for sequence
  createSetEndAction(tickTime: TickTime): Action; //Create set end time action for sequence
  getDuration(): Promise<TickTime>; //Returns timecode representing the duration of this track item relative to the sequence start.
  getType(): Promise<number>; //Index representing the type of this track item.
  isDisabled(): Promise<boolean>; //Returns true if trackitem is muted/disabled
  createSetDisabledAction(disabled: boolean): Action; //Returns an action that enables/disables the trackItem
  createSetNameAction(inName: string): Action; //Returns an action that renames the trackItem
  getMediaType(): Promise<Guid>; //Returns UUID representing the underlying media type of this track item
  getTrackIndex(): Promise<number>; //Index representing the track index of the track this track item belongs to
  getProjectItem(): Promise<ProjectItem>; //Returns the project item for this track item.
  getComponentChain(): Promise<VideoComponentChain>; //Returns VideoComponentChain
};

export declare type VideoComponentChainStatic = {};

export declare type VideoComponentChain = {
  createInsertComponentAction(
    component: Component | VideoFilterComponent,
    componentInsertionIndex: number,
  ): Action; //Creates and returns an insert component action
  createAppendComponentAction(
    component: Component | VideoFilterComponent,
  ): Action; //Creates and returns an append component action
  createRemoveComponentAction(
    component: Component | VideoFilterComponent,
  ): Action; //Creates and returns an remove component action
  getComponentAtIndex(componentIndex: number): Component; //Returns the component at the given index
  getComponentCount(): number; //Gets the number of components in the component chain
};

export declare type VideoFilterComponentStatic = {};

export declare type VideoFilterComponent = {};

export declare type VideoFilterFactoryStatic = {
  createComponent(matchName: string): Promise<VideoFilterComponent>; //Creates a new video filter component based on the input matchName
  getMatchNames(): Promise<string[]>; //Returns an array of video filter matchNames
  getDisplayNames(): Promise<string[]>; //Returns an array of video filter display names
};

export declare type VideoFilterFactory = {};

export declare type VideoTrackStatic = {
  EVENT_TRACK_CHANGED: string; //Event Object for Track changed
  EVENT_TRACK_INFO_CHANGED: string; //Event Object for Track Info Changed
  EVENT_TRACK_LOCK_CHANGED: string; //Event Object for Track Lock Changed
};

export declare type VideoTrack = {
  setMute(mute: boolean): Promise<boolean>; //sets the mute state of the track to muted/unmuted
  getMediaType(): Promise<Guid>; //UUID representing the underlying media type of this track
  getIndex(): Promise<number>; //Index representing the track index of this track within the track group.
  isMuted(): Promise<boolean>; //Get mute state of the track
  getTrackItems(
    trackItemType: Constants.TrackItemType,
    includeEmptyTrackItems: boolean,
  ): VideoClipTrackItem[]; //Returns array of VideoClipTrackItem from the track item type
  name: string; //Get the name of the track
  id: number; //The ID of the track within the TrackGroup
};

export declare type VideoTransitionStatic = {
  TRANSITIONPOSITION_START: number; //TransitionPosition: START
  TRANSITIONPOSITION_END: number; //TransitionPosition: END
};

export declare type VideoTransition = {};

export declare type EventManagerStatic = {
  addEventListener(
    target: Project | Sequence | VideoTrack | AudioTrack | EncoderManager,
    eventName:
      | string
      | Constants.SnapEvent
      | Constants.ProjectEvent
      | Constants.SequenceEvent
      | Constants.OperationCompleteEvent,
    eventHandler: (event?: Object) => void,
    inCapturePhase?: boolean,
  ): void; //add event listener to target object
  removeEventListener(
    target: Project | Sequence | VideoTrack | AudioTrack | EncoderManager,
    eventName:
      | string
      | Constants.SnapEvent
      | Constants.ProjectEvent
      | Constants.SequenceEvent
      | Constants.OperationCompleteEvent,
    eventHandler: (event?: Object) => void,
  ): void; //remove event listener from target object
  addGlobalEventListener(
    eventName:
      | string
      | Constants.SnapEvent
      | Constants.ProjectEvent
      | Constants.SequenceEvent
      | Constants.OperationCompleteEvent,
    eventHandler: (event?: Object) => void,
    inCapturePhase?: boolean,
  ): void; //add global event listener
  removeGlobalEventListener(
    eventName:
      | string
      | Constants.SnapEvent
      | Constants.ProjectEvent
      | Constants.SequenceEvent
      | Constants.OperationCompleteEvent,
    eventHandler: (event?: Object) => void,
  ): void; //remove global event listener
};

export declare type EventManager = {};

export declare type TranscriptStatic = {
  importFromJSON(jsonString: string): TextSegments; //Returns TextSegments object initialized from jsonString
  createImportTextSegmentsAction(
    textSegments: TextSegments,
    clipProjectItem: ClipProjectItem,
  ): Action; //Create action that import external transcripts to ClipProjectItem
  exportToJSON(clipProjectItem: ClipProjectItem): Promise<string>; //Export transcripts inside of clipProjectItem as JSON string if transcript exist
};

export declare type Transcript = {};

export namespace Constants {
  export enum MediaType {
    ANY,
    DATA,
    VIDEO,
    AUDIO,
  }

  export enum ContentType {
    ANY,
    SEQUENCE,
    MEDIA,
  }

  export enum ProjectItemColorLabel {
    VIOLET,
    IRIS,
    LAVENDER,
    CERULEAN,
    FOREST,
    ROSE,
    MANGO,
    PURPLE,
    BLUE,
    TEAL,
    MAGENTA,
    TAN,
    GREEN,
    BROWN,
    YELLOW,
  }

  export enum TransitionPosition {
    START,
    END,
  }

  export enum TrackItemType {
    EMPTY,
    CLIP,
    TRANSITION,
    PREVIEW,
    FEEDBACK,
  }

  export enum ProjectEvent {
    OPENED,
    CLOSED,
    DIRTY,
    ACTIVATED,
    PROJECT_ITEM_SELECTION_CHANGED,
  }

  export enum InterpolationMode {
    BEZIER,
    HOLD,
    LINEAR,
    TIME,
    TIME_TRANSITION_END,
    TIME_TRANSITION_START,
  }

  export enum SequenceOperation {
    APPLYCUT,
    CREATEMARKER,
    CREATESUBCLIP,
  }

  export enum PropertyType {
    PERSISTENT,
    NON_PERSISTENT,
  }

  export enum SequenceEvent {
    ACTIVATED,
    CLOSED,
    SELECTION_CHANGED,
  }

  export enum VideoTrackEvent {
    TRACK_CHANGED,
    INFO_CHANGED,
    LOCK_CHANGED,
  }

  export enum AudioTrackEvent {
    TRACK_CHANGED,
    INFO_CHANGED,
    LOCK_CHANGED,
  }

  export enum EncoderEvent {
    RENDER_COMPLETE,
    RENDER_ERROR,
    RENDER_CANCEL,
    RENDER_QUEUE,
    RENDER_PROGRESS,
  }

  export enum ScratchDiskFolderType {
    CAPTURE,
    AUDIO_PREVIEW,
    VIDEO_PREVIEW,
    AUTO_SAVE,
    CCL_LIBRARIES,
    CAPSULE_MEDIA,
  }

  export enum ScratchDiskFolder {
    SAME_AS_PROJECT,
    MY_DOCUMENTS,
  }

  export enum MetadataType {
    INTEGER,
    REAL,
    TEXT,
    BOOLEAN,
  }

  export enum ExportType {
    QUEUE_TO_AME,
    QUEUE_TO_APP,
    IMMEDIATELY,
  }

  export enum PreferenceKey {
    AUTO_PEAK_GENERATION,
    IMPORT_WORKSPACE,
    SHOW_QUICKSTART_DIALOG,
  }

  export enum SnapEvent {
    KEYFRAME,
    RAZOR_PLAYHEAD,
    RAZOR_MARKER,
    TRACKITEM,
    GUIDES,
    PLAYHEAD_TRACKITEM,
  }

  export enum OperationCompleteEvent {
    CLIP_EXTEND_REACHED,
    EFFECT_DROP_COMPLETE,
    EFFECT_DRAG_OVER,
    EXPORT_MEDIA_COMPLETE,
    GENERATIVE_EXTEND_COMPLETE,
    IMPORT_MEDIA_COMPLETE,
  }

  export enum OperationCompleteState {
    SUCCESS,
    CANCELLED,
    FAILED,
  }

  export enum PixelAspectRatio {
    SQUARE,
    DVNTSC,
    DVNTSCWide,
    DVPAL,
    DVPALWide,
    Anamorphic,
    HDAnamorphic1080,
    DVCProHD,
  }

  export enum VideoFieldType {
    PROGRESSIVE,
    UPPER_FIRST,
    LOWER_FIRST,
  }

  export enum VideoDisplayFormatType {
    FPS_23_976,
    FPS_25,
    FPS_29_97,
    FPS_29_97_NON_DROP,
    FEET_FRAME_16mm,
    FEET_FRAME_35mm,
    FRAMES,
  }

  export enum AudioChannelType {
    MONO,
    STEREO,
    SURROUND_51,
    MULTI,
  }

  export enum AudioDisplayFormatType {
    SAMPLE_RATE,
    MILLISECONDS,
  }

  export enum MarkerColor {
    GREEN,
    RED,
    MAGNETA,
    ORANGE,
    YELLOW,
    BLUE,
    CYAN,
  }
}

export default premierepro;
