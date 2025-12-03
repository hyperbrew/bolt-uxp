// Reference Original: https://github.com/AdobeDocs/uxp-premiere-pro/blob/main/src/pages/ppro_reference/types.d.ts
// Many corrections have been made from that file

export declare type premierepro = {
  AudioClipTrackItem: AudioClipTrackItemStatic;
  AudioComponentChain: AudioComponentChainStatic;
  AudioTrack: AudioTrackStatic;
  CaptionTrack: CaptionTrackStatic;
  ClipProjectItem: ClipProjectItemStatic;
  EncoderManager: EncoderManagerStatic;
  Exporter: ExporterStatic;
  FolderItem: FolderItemStatic;
  Guid: GuidStatic;
  Keyframe: KeyframeStatic;
  Marker: MarkerStatic;
  Markers: MarkersStatic;
  Metadata: MetadataStatic;
  Project: ProjectStatic;
  ProjectClosedEvent: ProjectClosedEventStatic;
  ProjectEvent: ProjectEventStatic;
  ProjectItem: ProjectItemStatic;
  ProjectSettings: ProjectSettingsStatic;
  Properties: PropertiesStatic;
  ScratchDiskSettings: ScratchDiskSettingsStatic;
  SequenceUtils: SequenceUtilsStatic;
  TickTime: TickTimeStatic;
  TrackItemSelection: TrackItemSelectionStatic;
  TransitionFactory: TransitionFactoryStatic;
  Utils: UtilsStatic;
  VideoClipTrackItem: VideoClipTrackItemStatic;
  VideoComponentChain: VideoComponentChainStatic;
  VideoFilterComponent: VideoFilterComponentStatic;
  VideoFilterFactory: VideoFilterFactoryStatic;
  VideoTrack: VideoTrackStatic;
  VideoTransition: VideoTransitionStatic;
};

export declare type Action = {};

export declare type AddTransitionOptions = {
  setApplyToStart(applyToStart: boolean): AddTransitionOptions; //Set whether to apply transition to the start or end of trackitem
  setForceSingleSided(forceSingleSided: boolean): AddTransitionOptions; //Set whether transition should be applied one/both sides
  setTransitionAlignment(transitionAlignment: number): AddTransitionOptions; //Sets the transitionAlignment of transition
  setDuration(tickTime: TickTime): AddTransitionOptions; //Sets the duration of transition
  applyToStart: boolean; //Get whether to apply transition to the start or end of trackitem
  forceSingleSided: boolean; //Get whether transition should be applied one/both sides
  transitionAlignment: number; //Gets the transitionAlignment of transition
  duration: TickTime; //Gets the duration of transition
};

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
  getMatchName(): string; //Returns the value of internal matchname for this trackItem
  getSpeed(): number; //Returns the value of speed of the trackItem
  isAdjustmentLayer(): boolean; //Returns true if the trackitem is an adjustment layer
  isSpeedReversed(): number; //Returns true if the trackitem is reversed
  createMoveAction(tickTime: TickTime): Action; //Returns an action moves the inPoint of the track item to a new time, by shifting it by a number of seconds.
  getInPoint(): TickTime; //Get timecode representing the inPoint of sequence.
  getOutPoint(): TickTime; //Get timecode representing the inPoint of sequence.
  createSetInPointAction(tickTime: TickTime): Action; //Create SetInPointAction for sequence
  createSetOutPointAction(tickTime: TickTime): Action; //Create SetInPointAction for sequence
  getStartTime(): TickTime; //Timecode representing the start of this track item relative to the sequence start.
  getEndTime(): TickTime; //Timecode representing the end of this track item relative to the sequence start.
  getDuration(): TickTime; //Timecode representing the duration of this track item relative to the sequence start.
  getType(): number; //Index representing the type of this track item.
  isMuted(): boolean; //Returns true if rackitem is muted/disabled
  createSetMutedAction(disabled: boolean): Action; //Returns an action that enables/disables the trackItem
  getMediaType(): Guid; //UUID representing the underlying media type of this track item
  getTrackIndex(): number; //Index representing the track index of the track this track item belongs to
  getProjectItem(): ProjectItem; //The project item for this track item.
  getComponentChain(): any;
};

export declare type AudioComponentChainStatic = {};

export declare type AudioComponentChain = {
  createInsertComponentAction(
    component: object,
    componentInsertionIndex: number,
  ): Action; //Creates and returns an insert component action
  createAppendComponentAction(component: object): Action; //Creates and returns an append component action
  createRemoveComponentAction(component: object): Action; //Creates and returns an remove component action
  getComponentAtIndex(componentIndex: number): VideoComponentChain; //Returns the component at the given index
  getComponentCount(): number; //Gets the number of components in the component chain
};

export declare type AudioTrackStatic = {
  EVENT_TRACK_CHANGED: string; //Event Object for Track changed
  EVENT_TRACK_INFO_CHANGED: string; //Event Object for Track Info Changed
  EVENT_TRACK_LOCK_CHANGED: string; //Event Object for Track Lock Changed
};

export declare type AudioTrack = {
  setMute(mute: boolean): boolean; //sets the mute state of the track to muted/unmuted
  getMediaType(): Guid; //UUID representing the underlying media type of this track
  getIndex(): number; //Index representing the track index of this track within the track group.
  isMuted(): boolean; //Get mute state of the track
  getTrackItems(trackItemType: number, includeEmptyTrackItems: boolean): any; //Returns array of AudioClipTrackItem from the track item type
  name: string; //Get the name of the track
  id: number; //The ID of the track within the TrackGroup
};

export declare type CaptionTrackStatic = {};

export declare type CaptionTrack = {
  setMute(mute: boolean): boolean; //sets the mute state of the track to muted/unmuted
  getMediaType(): Guid; //UUID representing the underlying media type of this track
  getIndex(): number; //Index representing the track index of this track within the track group.
  isMuted(): boolean; //Get mute state of the track
  getTrackItems(trackItemType: number, includeEmptyTrackItems: boolean): []; //This returns the track items of the specified media type from the given track
  name: string; //Get the name of the track
  id: number; //The ID of the track within the TrackGroup
};

export declare type ClipProjectItemStatic = {
  cast(projectItem: any): any;
};

export declare type ClipProjectItem = {
  getColorSpace(): ColorSpace; //Get color space object of the project item
  getOverrideColorSpaceList(): []; //Get the override color space list
  getInputLUTID(): string; //Get Guid of Input LUT overridden on media
  createSetInputLUTIDAction(stringLUTID: string): Action; //Create action for setting Guid of Input LUT on media. This applies for Video Clips only.
  isSequence(): boolean; //Returns true if the project item is sequence
  canChangeMediaPath(): boolean; //Returns true if Premiere Pro can change the path, associated with this project item; otherwise, returns false
  isOffline(): boolean; //Returns true if the media is offline
  canProxy(): boolean; //Indicates whether it is possible to attach a proxy, to this project item.
  getProxyPath(): string; //Returns the proxy path if the project item has a proxy attached
  hasProxy(): boolean; //Indicates whether a proxy has already been attached, to the project item.
  findItemsMatchingMediaPath(matchString: string, ignoreSubclips?: boolean): []; //Returns array of projects items with media paths containing match string
  refreshMedia(): boolean; //Updates representation of the media associated with the project item
  createSetOfflineAction(): Action; //Returns an action which sets the media offline
  getFootageInterpretation(): InterpretFootage; //Get the footage interpretation object for project item
  createSetFootageInterpretationAction(InterpretFootage: object): Action; //Set the footage interpretation object for project item
  getParent(): ProjectItem; //Get the root item of the project which contains all items of the project on the lowest level
  getProject(): Project; //Get the root item of the project which contains all items of the project on the lowest level.
  isMergedClip(): boolean; //Returns true if the clip Project item is a merged clip
  isMulticamClip(): boolean; //Returns true if the clip Project item is a multicam clip
  getEmbeddedLUTID(): string; //Get GUID of LUT embedded in media
  createSetScaleToFrameSizeAction(): Action; //Returns an action which sets the scale to frame to true
  getContentType(): any; //Get content type of the Project item
  getSequence(): Sequence; //Get the sequence of the Project item
  getInPoint(mediaType: Constants.MediaType): TickTime; //Get the in point of the Project item
  getOutPoint(mediaType: Constants.MediaType): TickTime; //Get the out point of the Project item
  getMediaFilePath(): string; //Get the media file path of the Project item.
  getComponentChain(mediaType: Constants.MediaType): string; //Get the media file path of the Project item.
  createSetInPointAction(tickTime: any): Action; //Returns an action which Sets the in point of the Project item
  createSetOverridePixelAspectRatioAction(
    inNumerator: any,
    inDenominator: any,
  ): Action; //Returns an action which sets Override pixel aspect ratio
  createSetOverrideFrameRateAction(inOverriddenFrameRateValue: any): Action; //Returns an action which sets the override frame rate
  createSetOutPointAction(tickTime: any): Action; //Returns an action which Sets the in point of the Project item
  createSetInOutPointsAction(inPoint: TickTime, outPoint: TickTime): any; //Set the in or out point of the Project item
  createClearInOutPointsAction(): Action; //Create Clear the in or out point of the Project item action
  name: string; //Get name of project item object
};

export declare type CloseProjectOptions = {
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

export declare type CompoundAction = {
  addAction(action: Action): boolean; //Add an action to the compound action
  empty: boolean; //Is the compound action empty?
};

export declare type EncoderManagerStatic = {
  getManager(): EncoderManager; //Get the Encoder Manager object.
  EXPORT_QUEUE_TO_AME: string; //Export type used to queue an export job into the Adobe Media Encoder export queue
  EXPORT_QUEUE_TO_APP: string; //Export type used to queue an export job into the app export queue
  EXPORT_IMMEDIATELY: string; //Export type used to immediately exporting an object
  EVENT_RENDER_COMPLETE: string; //Broadcast when AME is finished rendering
};

export declare type EncoderManager = {
  exportSequence(
    sequence: object,
    exportType: Constants.ExportType,
    outputFile?: string,
    presetFile?: string,
    exportFull?: boolean,
  ): boolean; //Export a sequence. If no output file and preset is specified, the sequence will be exported with the applied export settings or standard export rules will be applied.
  isAMEInstalled: boolean; //Check if AME is installed.
};

export declare type ExporterStatic = {
  exportSequenceFrame(
    sequence: object,
    time: TickTime,
    filename: string,
    filepath: string,
    width: number,
    height: number,
  ): boolean; //Exports from a sequence. Supported formats are bmp, dpx, gif, jpg, exr, png, tga and tif
};

export declare type Exporter = {};

export declare type FolderItemStatic = {
  cast(projectItem: any): any;
};

export declare type FolderItem = {
  createBinAction(name: string, makeUnique: boolean): Action; //Returns an action that lets users create a new bin.
  createSmartBinAction(name: string, searchQuery: string): Action; //Creates a smart bin with given name and returns the Folder object
  createRenameBinAction(arg0: string): Action; //Rename the Bin and return true if it's successful
  getParent(): ProjectItem; //Get the root item of the project which contains all items of the project on the lowest level
  getProject(): Project; //Get the root item of the project which contains all items of the project on the lowest level.
  getItems(): []; //Collection of child items of this folder.
  createRemoveItemAction(item: ProjectItem): Action; //Creates an action that removes the given item from this folder.
  createMoveItemAction(item: ProjectItem, newParent: FolderItem): Action; //Creates an action that moves the given item to the provided folder item newParent.
  parent: object; //The root item of the project which contains all items of the project on the lowest level.
  name: string; //Get name of project item object
};

export declare type FootageInterpretation = {
  getFrameRate(): number; //Get frame rate of footage
  setFrameRate(arg0: number): boolean; //Set frame rate of footage
  getPixelAspectRatio(): number; //Get pixel aspect ratio of footage
  setPixelAspectRatio(arg0: number): boolean; //Set pixel aspect ratio of footage
  getFieldType(): number; //Get field type of footage
  setFieldType(arg0: number): boolean; //Set field type of footage
  getRemovePullDown(): boolean; //Get removePullDown property of footage
  setRemovePullDown(arg0: boolean): boolean; //Set removePullDown property of footage
  getAlphaUsage(): number; //Get alpha usage type property of footage
  setAlphaUsage(arg0: number): boolean; //Set alpha usage type property of footage
  getIgnoreAlpha(): boolean; //Get ignore alpha property of footage
  setIgnoreAlpha(arg0: boolean): boolean; //Set ignore alpha property of footage
  getInvertAlpha(): boolean; //Get invert alpha property of footage
  setInvertAlpha(arg0: boolean): boolean; //Set invert alpha property of footage
  getVrConform(): number; //Get vr conform projection type of footage
  setVrConform(arg0: number): boolean; //Set vr conform projection type of footage
  getVrLayout(): number; //Get vr layout type of footage
  setVrLayout(arg0: number): boolean; //Set vr layout type of footage
  getVrHorzView(): number; //Get vr horizontal view of footage
  setVrHorzView(arg0: number): boolean; //Set vr horizontal view of footage
  getVrVertView(): number; //Get vr vertical view of footage
  setVrVertView(arg0: number): boolean; //Set vr horizontal view of footage
  getInputLUTID(): string; //Get input LUTID of footage
  setInputLUTID(arg0: string): boolean; //Set input LUTID of footage
  getColorSpace(): ColorSpace; //Get colorspace of footage
  setColorSpace(ColorSpace: object): boolean; //Set colorspace of footage
  ALPHACHANNEL_NONE: number; //alpha channel none
  ALPHACHANNEL_STRAIGHT: number; //alpha channel straight
  ALPHACHANNEL_PREMULTIPLIED: number; //alpha channel premultiplied
  ALPHACHANNEL_IGNORE: number; //alpha channel ignore
  FIELD_TYPE_DEFAULT: number; //default filed type invalid
  FIELD_TYPE_PROGRESSIVE: number; //field type progressive
  FIELD_TYPE_UPPERFIRST: number; //field type upperfirst
  FIELD_TYPE_LOWERFIRST: number; //field type lowerfirst
};

export declare type GuidStatic = {
  fromString(stringValue: string): Guid; //Create a guid from a string
};

export declare type Guid = {
  toString(): string; //Return string representation of the GUID
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
  getTemporalInterpolationMode(): number; //Gets temporal interpolation mode of a keyframe
  setTemporalInterpolationMode(temporalInterpolationMode: number): boolean; //Sets temporal interpolation mode of a keyframe
  value: object;
  position: object; //Get/Set position of a keyframe
};

export declare type MarkerStatic = {
  MARKER_TYPE_COMMENT: string; //Marker Type: Comment
  MARKER_TYPE_CHAPTER: string; //Marker Type: Chapter
  MARKER_TYPE_FLVCUEPOINT: string; //Marker Type: FLVCuePoint
  MARKER_TYPE_WEBLINK: string; //Marker Type: WebLink
};

export declare type Marker = {
  getComments(): string; //Get comments of the marker.
  getDuration(): object; //Get duration time of the marker.
  getName(): string; //Get name of the marker.
  getUrl(): string; //Get url of the marker.
  getTarget(): string; //Get target of the marker. Used together with url for web targets.
  getType(): string; //Get type of the marker. e.g. Cue / Track / Subclip / Cart
  getStart(): object; //Get start time of the marker.
  createSetNameAction(name: string): object; //Return an action to set the name of the marker.
  createSetDurationAction(tickTime: TickTime): object; //Return an action to set the duration of the marker.
  createSetTypeAction(markerType: string): object; //Return an action to set the type of the marker.
  createSetCommentsAction(comments: string): object; //Return an action to set the comments of the marker.
};

export declare type MarkersStatic = {
  getMarkers(markerOwnerObject: any): Markers; //Returns the Markers object for Sequence Or ProjectItem
};

export declare type Markers = {
  getMarkers(filters?: []): []; //Get all markers
  createRemoveMarkerAction(marker: Marker): object; //Remove the given marker
  createMoveMarkerAction(marker: Marker, tickTime: TickTime): object; //Move the given marker at new time value
  createAddMarkerAction(
    Name: string,
    markerType?: string,
    startTime?: TickTime,
    duration?: TickTime,
    comments?: string,
  ): object; //Add a new marker
};

export declare type MetadataStatic = {
  getProjectMetadata(projectItem: ProjectItem): string; //Get project metadata
  getXMPMetadata(projectItem: ProjectItem): string; //Get project XMP metadata
  createSetProjectMetadataAction(
    projectItem: ProjectItem,
    metadata: string,
    updatedFields: [],
  ): Action; //Get set project metadata action
  createSetXMPMetadataAction(
    projectItem: ProjectItem,
    metadata: string,
  ): Action; //Get set project XMP metadata action
  addPropertyToProjectMetadataSchema(
    name: string,
    label: string,
    type: number,
  ): boolean; //Add name and label property to project metadata schema
  getProjectColumnsMetadata(projectItem: ProjectItem): string; //Get project column metadata from project item
  getProjectPanelMetadata(): string; //Get project panel metadata
  setProjectPanelMetadata(arg0: string): boolean; //Set project panel metadata
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

export declare type PointF = {
  distanceTo(point: object): number; //Get the distance from one point to another point
  x: number; //Get/Set the x value of a point
  y: number; //Get/Set the y value of a point
};

export declare type PointKeyframe = {
  value: object;
  position: object; //Get/Set position of a keyframe
};

export declare type ProjectStatic = {
  createProject(path: string): Project; //Create a new project
  open(path: string, openProjectOptions?: OpenProjectOptions): Project; //Open a project
  //! Adobe to Add Promise
  getActiveProject(): Promise<Project>; //Currently active project.
  getProject(projectGuid: Guid): Project; //Get project referenced by given UID
};

export declare type Project = {
  getActiveSequence(): Sequence; //Get the active sequence of the project
  setActiveSequence(sequence: Sequence): boolean; //Set the active sequence of the project
  createSequence(name: string, presetPath?: string): Sequence; //Create a new sequence with the default preset path - Parameter presetPath is deprecated, instead use createSequenceWithPresetPath()
  createSequenceFromMedia(
    name: string,
    clipProjectItems: [],
    targetBin?: ProjectItem,
  ): Sequence; //Create a new sequence with a given name and medias
  getColorSettings(): ProjectColorSettings; //Get project color settings object
  deleteSequence(sequence: Sequence): boolean; //Delete a given sequence from the project
  getInsertionBin(): ProjectItem; //Get current insertion bin
  openSequence(sequence: Sequence): boolean; //Open a sequence and return true if successful.
  importSequences(projectPath: string, sequenceIds: []): boolean;
  importAEComps(
    aepPath: string,
    compNames: [],
    TargetBin?: ProjectItem,
  ): boolean;
  importAllAEComps(aepPath: string, TargetBin?: ProjectItem): boolean;
  importFiles(
    filePaths: [],
    suppressUI?: boolean,
    targetBin?: ProjectItem,
    asNumberedStills?: boolean,
  ): boolean; //Import files in root/target bin of the project
  close(closeProjectOptions?: CloseProjectOptions): boolean; //Close a project
  save(): boolean; //Save the project
  saveAs(path: string): boolean; //Save the project at the provided path
  getSequence(guid: Guid): Sequence; //Get sequence by id from the project
  getSequences(): []; //Get an array of all sequences in this project.
  //! Should be Folder Item
  getRootItem(): Promise<FolderItem>; //The root item of the project which contains all items of the project on the lowest level.
  pauseGrowing(pause: boolean): boolean; //Pause growing of files instead swap the files
  executeTransaction(callback: any, undoString?: any): any; //Execute undoable transaction by passing compound action
  lockedAccess(callback: any): any; //Get a read/upgrade locked access to Project, project state will not change during the execution of callback function. Can call executeTransaction while having locked access.
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
  getSupportedGraphicsWhiteLuminances(): []; //Get all the graphics white luminance as array of values
  getGraphicsWhiteLuminance(): number; //Get the graphics white luminance value
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
  project: object; //The project object.
};

export declare type ProjectItemStatic = {};

export declare type ProjectItem = {
  getParent(): ProjectItem; //Get the root item of the project which contains all items of the project on the lowest level
  getProject(): Project; //Get the root item of the project which contains all items of the project on the lowest level.
  name: string; //Get name of project item object
};

export declare type ProjectSettingsStatic = {
  createSetScratchDiskSettingsAction(
    project: Project,
    projectScratchDiskSettings: ProjectScratchDiskSettings,
  ): Action; //Returns an action which sets ScratchDiskSetting
  getScratchDiskSettings(project: Project): ProjectScratchDiskSettings; //Returns project ScratchDiskSettings
};

export declare type ProjectSettings = {};

export declare type PropertiesStatic = {
  getProperties(propertyOwnerObject: any): Properties; //If property owner is not provided, it return application properties, else return the properties of the passed on object.
  PROPERTY_PERSISTENT: number; //Property is persistent in backend and shared across cloud project.
  PROPERTY_NON_PERSISTENT: number; //Property is not persisted and will be cleared when the project closes.
};

export declare type Properties = {
  getValueAsInt(name: string): number; //Get named value as integer number
  getValueAsFloat(name: string): number; //Get named value as float number
  getValueAsBool(name: string): boolean; //Get named value as boolean
  getValue(name: string): string; //Get named value in native string form
  createSetValueAction(): object; //Create an action to set a named value through scripting. The parameters are <name, value (number, boolean or string), persistence flag>. This method can fail if e.g. the underlying properties object does not support action based setting of properties.
  hasValue(name: string): boolean; //Check if a named value exists under this name.
  clearValue(name: string): boolean; //Clear the value with the given name
  createClearValueAction(name: string): object; //Create an action to clear the value with the given name. This method can fail if e.g. the underlying properties object does not support action based setting of properties.
};

export declare type RectF = {
  width: number; //Get/Set the width of a rect
  height: number; //Get/Set the height of a rect
};

export declare type ScratchDiskSettingsStatic = {
  FOLDERTYPE_VIDEO_CAPTURE: string; //Folder Type: VIDEOCAPTURE
  FOLDERTYPE_AUDIO_CAPTURE: string; //Folder Type: AUDIOCAPTURE
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
    ScratchDiskType: string,
    ScratchDiskValue: string,
  ): boolean; //Sets project ScratchDisk Path
  getScratchDiskPath(ScratchDiskType: string): string; //Gets the scratchDisk location for specific disktype
};

export declare type Sequence = {
  getSequenceVideoTimeDisplayFormat(): TimeDisplay; //Get video time display format of this sequence
  getSequenceAudioTimeDisplayFormat(): TimeDisplay; //Get audio time display format of this sequence
  getPlayerPosition(): TickTime; //Get the player's current position
  setPlayerPosition(positionTime?: TickTime): boolean; //Set the player's current position
  clearSelection(): boolean; //Clears TrackItem Selection
  setSelection(TrackItemSelection: trackItemSelection): boolean; //Updates sequence selection using the given track item selection.
  getVideoTrackCount(): number; //Get video track count from this sequence
  getAudioTrackCount(): number; //Get audio track count from this sequence
  getCaptionTrackCount(): number; //Get caption track count from this sequence
  getVideoTrack(trackIndex: number): VideoTrack; //Get video track from track index
  getAudioTrack(trackIndex: number): AudioTrack; //Get audio track from track index
  getCaptionTrack(trackIndex: number): CaptionTrack; //Get caption track from track index
  getSettings(): SequenceSettings; //Get sequence settings object
  setSettings(sequenceSettings: SequenceSettings): boolean; //Set sequence settings
  createCloneAction(): Action; //Creates an action to clone the given sequence
  createSubsequence(ignoreTrackTargeting?: boolean): Sequence; //Returns a new sequence, which is a sub-sequence of the existing sequence
  isDoneAnalyzingForVideoEffects(): boolean; //Returns whether or not the sequence is done analyzing for video effects
  getZeroPoint(): TickTime; //Time representing the zero point of the sequence.
  getEndTime(): TickTime; //Time representing the end of the sequence
  getInPoint(): TickTime; //Get time representing the inPoint of sequence.
  getOutPoint(): TickTime; //Get time representing the inPoint of sequence.
  createSetZeroPointAction(tickTime: TickTime): Action; //Create an action to set an InPoint for the sequence
  getProjectItem(): ProjectItem; //Get the associated projectItem of the sequence.
  getSelection(): TrackItemSelection; //Returns the current selection group of the sequence.
  getFrameSize(): RectF; //Gets the size of the frame
  getTimebase(): string; //Gets the time base of sequence
  guid: Guid; //The unique identifier of the sequence.
  name: string; //The sequence name.
};

export declare type SequenceUtilsStatic = {
  performSceneEditDetectionOnSelection(
    clipOperation: string,
    TrackItemSelection: trackItemSelection,
  ): boolean; //Performs cut detection on the sequence selection
  SEQUENCE_OPERATION_APPLYCUT: string; //ApplyCuts
  SEQUENCE_OPERATION_CREATEMARKER: string; //CreateMarkers
  SEQUENCE_OPERATION_CREATESUBCLIP: string; //CreateSubclips
};

export declare type SequenceUtils = {};

export declare type TickTimeStatic = {
  createWithFrameAndFrameRate(
    frameCount: number,
    frameRate: FrameRate,
  ): TickTime; //Constructs a TickTime object with a frame and a frame rate.
  createWithSeconds(seconds: number): TickTime; //Constructs a TickTime object with seconds.
  createWithTicks(ticks: string): TickTime; //Constructs a TickTime object with ticks as a string.
  TIME_ZERO: object; //Zero Tick Time Constant
  TIME_ONE_SECOND: object; //One Second Tick Time Constant
  TIME_ONE_MINUTE: object; //One Second Tick Time Constant
  TIME_ONE_HOUR: object; //One Hour Tick Time Constant
  TIME_MAX: object; //Max Tick Time Constant
  TIME_MIN: object; //Min Tick Time Constant
  TIME_INVALID: object; //Invalid Tick Time Constant
};

export declare type TickTime = {
  equals(tickTime: TickTime): boolean; //Returns true if the given TickTime is equal to the TickTime object
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
  addItem(trackItem: object, skipDuplicateCheck?: boolean): boolean; //Add a track item to this selection
  removeItem(trackItem: object): boolean; //Remove a track item from this selection
};

export declare type TransitionFactoryStatic = {
  createVideoTransition(matchName: string): VideoTransition; //Creates a new video filter component based on the input matchName
  getVideoTransitionMatchNames(): []; //Return a promise which will be fullfilled with an array of video transition matchnames
};

export declare type TransitionFactory = {};

export declare type UtilsStatic = {
  isAEInstalled(): boolean; //Check if AE is installed.
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
  createRemoveVideoTransitionAction(transitionPosition?: number): Action; //Returns true if trackItem has transition
  getMatchName(): string; //Returns the value of internal matchname for this trackItem
  getSpeed(): number; //Returns the value of speed of the trackItem
  isAdjustmentLayer(): boolean; //Returns true if the trackitem is an adjustment layer
  isSpeedReversed(): number; //Returns true if the trackitem is reversed
  createMoveAction(tickTime: TickTime): Action; //Returns an action moves the inPoint of the track item to a new time, by shifting it by a number of seconds.
  getInPoint(): TickTime; //Get timecode representing the inPoint of sequence.
  getOutPoint(): TickTime; //Get timecode representing the inPoint of sequence.
  createSetInPointAction(tickTime: TickTime): Action; //Create SetInPointAction for sequence
  createSetOutPointAction(tickTime: TickTime): Action; //Create SetInPointAction for sequence
  getStartTime(): TickTime; //Timecode representing the start of this track item relative to the sequence start.
  getEndTime(): TickTime; //Timecode representing the end of this track item relative to the sequence start.
  getDuration(): TickTime; //Timecode representing the duration of this track item relative to the sequence start.
  getType(): number; //Index representing the type of this track item.
  isMuted(): boolean; //Returns true if rackitem is muted/disabled
  createSetMutedAction(disabled: boolean): Action; //Returns an action that enables/disables the trackItem
  getMediaType(): Guid; //UUID representing the underlying media type of this track item
  getTrackIndex(): number; //Index representing the track index of the track this track item belongs to
  getProjectItem(): ProjectItem; //The project item for this track item.
  getComponentChain(): any;
};

export declare type VideoComponentChainStatic = {};

export declare type VideoComponentChain = {
  createInsertComponentAction(
    component: object,
    componentInsertionIndex: number,
  ): Action; //Creates and returns an insert component action
  createAppendComponentAction(component: object): Action; //Creates and returns an append component action
  createRemoveComponentAction(component: object): Action; //Creates and returns an remove component action
  getComponentAtIndex(componentIndex: number): VideoComponentChain; //Returns the component at the given index
  getComponentCount(): number; //Gets the number of components in the component chain
};

export declare type VideoFilterComponentStatic = {};

export declare type VideoFilterComponent = {};

export declare type VideoFilterFactoryStatic = {
  createComponent(matchName: string): VideoFilterComponent; //Creates a new video filter component based on the input matchName
  getMatchNames(): []; //Returns an array of video filter matchNames
};

export declare type VideoFilterFactory = {};

export declare type VideoTrackStatic = {
  EVENT_TRACK_CHANGED: string; //Event Object for Track changed
  EVENT_TRACK_INFO_CHANGED: string; //Event Object for Track Info Changed
  EVENT_TRACK_LOCK_CHANGED: string; //Event Object for Track Lock Changed
};

export declare type VideoTrack = {
  setMute(mute: boolean): boolean; //sets the mute state of the track to muted/unmuted
  getMediaType(): Guid; //UUID representing the underlying media type of this track
  getIndex(): number; //Index representing the track index of this track within the track group.
  isMuted(): boolean; //Get mute state of the track
  getTrackItems(trackItemType: number, includeEmptyTrackItems: boolean): any; //Returns array of VideoClipTrackItem from the track item type
  name: string; //Get the name of the track
  id: number; //The ID of the track within the TrackGroup
};

export declare type VideoTransitionStatic = {
  TRANSITIONPOSITION_START: number; //TransitionPosition: START
  TRANSITIONPOSITION_END: number; //TransitionPosition: END
};

export declare type VideoTransition = {};

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
  }

  export enum ScratchDiskFolderType {
    AUDIO_CAPTURE,
    VIDEO_CAPTURE,
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
}

export default premierepro;
