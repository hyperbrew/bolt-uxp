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
  PRProduction: PRProductionStatic;
  Project: ProjectStatic;
  ProjectClosedEvent: ProjectClosedEventStatic;
  ProjectConverter: ProjectConverterStatic;
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
  /**
   * Constructs a new instance of the AddTransitionOptions class.
   * @constructor
   */
  (): AddTransitionOptions;

  /**
   * Set whether to apply transition to the start or end of trackitem
   *
   * @param applyToStart
   */
  setApplyToStart(applyToStart: boolean): AddTransitionOptions;

  /**
   * Set whether transition should be applied to one/both sides
   *
   * @param forceSingleSided
   */
  setForceSingleSided(forceSingleSided: boolean): AddTransitionOptions;

  /**
   * Sets the transitionAlignment of the transition
   *
   * @param transitionAlignment
   */
  setTransitionAlignment(transitionAlignment: number): AddTransitionOptions;

  /**
   * Sets the duration of transition
   *
   * @param tickTime Sets the duration of transition in TickTime
   */
  setDuration(tickTime: TickTime): AddTransitionOptions;

  /**
   * Get whether to apply transition to the start or end of trackitem
   * @readonly
   */
  readonly applyToStart: boolean;

  /**
   * Get whether transition should be applied to one/both sides
   * @readonly
   */
  readonly forceSingleSided: boolean;

  /**
   * Gets the transitionAlignment of transition
   * @readonly
   */
  readonly transitionAlignment: number;

  /**
   * Gets the duration of transition
   * @readonly
   */
  readonly duration: TickTime;
};

export declare type AppPreferenceStatic = {
  /**
   * Set backend preference using given list of property keys. The parameters are <key, value (number, boolean or string), persistence flag>
   *
   * @param key App preference key to set
   * @param value Value to set for the preference key
   * @param persistenceFlag Indicates whether the preference should be persisted or not
   */
  setValue(
    key: Constants.PreferenceKey,
    value: boolean | string | number,
    persistenceFlag: Constants.PropertyType,
  ): boolean;

  /**
   * Get preference value in native string form
   *
   * @param preferenceKey App preference key to get
   */
  getValue(preferenceKey: Constants.PreferenceKey): string;

  /**
   * Preference string key used to modify auto-peak generation settings
   * @readonly
   */
  readonly KEY_AUTO_PEAK_GENERATION: string;

  /**
   * Preference string key used to modify import workspace settings
   * @readonly
   */
  readonly KEY_IMPORT_WORKSPACE: string;

  /**
   * Preference string key used to modify show quickstart dialog settings
   * @readonly
   */
  readonly KEY_SHOW_QUICKSTART_DIALOG: string;

  /**
   * Property is persistent in backend and shared across cloud project.
   * @readonly
   */
  readonly PROPERTY_PERSISTENT: number;

  /**
   * Property is not persisted and will be cleared when the project closes.
   * @readonly
   */
  readonly PROPERTY_NON_PERSISTENT: number;
};

export declare type AppPreference = {};

export declare type Application = {
  /**
   * @readonly
   */
  readonly version: string;
};

export declare type AudioClipTrackItemStatic = {
  /**
   * Empty Track Item Type
   * @readonly
   */
  readonly TRACKITEMTYPE_EMPTY: number;

  /**
   * Clip Track Item Type
   * @readonly
   */
  readonly TRACKITEMTYPE_CLIP: number;

  /**
   * Transition Track Item Type
   * @readonly
   */
  readonly TRACKITEMTYPE_TRANSITION: number;

  /**
   * Previe Track Item Type
   * @readonly
   */
  readonly TRACKITEMTYPE_PREVIEW: number;

  /**
   * Feedback Track Item Type
   * @readonly
   */
  readonly TRACKITEMTYPE_FEEDBACK: number;
};

export declare type AudioClipTrackItem = {
  /**
   * Returns the value of internal matchname for this trackItem
   */
  getMatchName(): Promise<string>;

  /**
   * Returns the display name for trackItem
   */
  getName(): Promise<string>;

  /**
   * Returns if trackItem is selected or not
   */
  getIsSelected(): Promise<boolean>;

  /**
   * Returns the value of speed of the trackItem
   */
  getSpeed(): Promise<number>;

  /**
   * Returns true if the trackitem is an adjustment layer
   */
  isAdjustmentLayer(): Promise<boolean>;

  /**
   * Returns true if the trackitem is reversed
   */
  isSpeedReversed(): Promise<number>;

  /**
   * Returns an action that moves the inPoint of the track item to a new time, by shifting it by a number of seconds.
   *
   * @param tickTime
   */
  createMoveAction(tickTime: TickTime): Action;

  /**
   * Returns a TickTime object representing the track item in point relative to the start time of the project item referenced by this track item.
   */
  getInPoint(): Promise<TickTime>;

  /**
   * Returns a TickTime object representing the track item out point relative to the start time of the project item referenced by this track item.
   */
  getOutPoint(): Promise<TickTime>;

  /**
   * Create SetInPointAction for setting the track item in point relative to the start time of the project item referenced by this track item
   *
   * @param tickTime Sets the In-Point in TickTime
   */
  createSetInPointAction(tickTime: TickTime): Action;

  /**
   * Create SetOutPointAction for setting the track item out point relative to the start time of the project item referenced by this track item
   *
   * @param tickTime Sets the Out-Point in TickTime
   */
  createSetOutPointAction(tickTime: TickTime): Action;

  /**
   * Returns a TickTime object representing the starting sequence time of this track item relative to the sequence start time.
   */
  getStartTime(): Promise<TickTime>;

  /**
   * Returns a TickTime object representing the ending sequence time of this track item relative to the sequence start time.
   */
  getEndTime(): Promise<TickTime>;

  /**
   * Create set start time action for sequence
   *
   * @param tickTime
   */
  createSetStartAction(tickTime: TickTime): Action;

  /**
   * Create set end time action for sequence
   *
   * @param tickTime
   */
  createSetEndAction(tickTime: TickTime): Action;

  /**
   * Returns timecode representing the duration of this track item relative to the sequence start.
   */
  getDuration(): Promise<TickTime>;

  /**
   * Index representing the type of this track item.
   */
  getType(): Promise<number>;

  /**
   * Returns true if trackitem is muted/disabled
   */
  isDisabled(): Promise<boolean>;

  /**
   * Returns an action that enables/disables the trackItem
   *
   * @param disabled
   */
  createSetDisabledAction(disabled: boolean): Action;

  /**
   * Returns an action that renames the trackItem
   *
   * @param inName
   */
  createSetNameAction(inName: string): Action;

  /**
   * Returns UUID representing the underlying media type of this track item
   */
  getMediaType(): Promise<Guid>;

  /**
   * Index representing the track index of the track this track item belongs to
   */
  getTrackIndex(): Promise<number>;

  /**
   * Returns the project item for this track item.
   */
  getProjectItem(): Promise<ProjectItem>;

  /**
   * Returns AudioComponentChain
   */
  getComponentChain(): Promise<AudioComponentChain>;
};

export declare type AudioComponentChainStatic = {};

export declare type AudioComponentChain = {
  /**
   * Creates and returns an insert component action
   *
   * @param component Audio filter component
   * @param componentInsertionIndex Index which the component shall be inserted
   */
  createInsertComponentAction(
    component: Component | AudioFilterComponent,
    componentInsertionIndex: number,
  ): Action;

  /**
   * Creates and returns an append component action
   *
   * @param component Audio filter component
   */
  createAppendComponentAction(
    component: Component | AudioFilterComponent,
  ): Action;

  /**
   * Creates and returns an remove component action
   *
   * @param component Audio filter component
   */
  createRemoveComponentAction(
    component: Component | AudioFilterComponent,
  ): Action;

  /**
   * Returns the component at the given index
   *
   * @param componentIndex
   * @returns Returns the component at the given index
   */
  getComponentAtIndex(componentIndex: number): Component;

  /**
   * Gets the number of components in the component chain
   */
  getComponentCount(): number;
};

export declare type AudioFilterComponentStatic = {};

export declare type AudioFilterComponent = {};

export declare type AudioFilterFactoryStatic = {
  /**
   * Creates a new audio filter component based on the input display name and trackItem for applying the audio filter
   *
   * @param displayName
   * @param inAudioClipTrackItem
   */
  createComponentByDisplayName(
    displayName: string,
    inAudioClipTrackItem: AudioClipTrackItem,
  ): Promise<AudioFilterComponent>;

  /**
   * Returns an array of audio filter displayNames
   */
  getDisplayNames(): Promise<string[]>;
};

export declare type AudioFilterFactory = {};

export declare type AudioTrackStatic = {
  /**
   * Event Object for Track changed
   * @readonly
   */
  readonly EVENT_TRACK_CHANGED: string;

  /**
   * Event Object for Track Info Changed
   * @readonly
   */
  readonly EVENT_TRACK_INFO_CHANGED: string;

  /**
   * Event Object for Track Lock Changed
   * @readonly
   */
  readonly EVENT_TRACK_LOCK_CHANGED: string;
};

export declare type AudioTrack = {
  /**
   * sets the mute state of the track to muted/unmuted
   *
   * @param mute
   */
  setMute(mute: boolean): Promise<boolean>;

  /**
   * UUID representing the underlying media type of this track
   */
  getMediaType(): Promise<Guid>;

  /**
   * Index representing the track index of this track within the track group.
   */
  getIndex(): Promise<number>;

  /**
   * Get mute state of the track
   */
  isMuted(): Promise<boolean>;

  /**
   * Returns array of AudioClipTrackItem from the track item type
   *
   * @param trackItemType Constants.TrackItemType.CLIP, Constants.TrackItemType.TRANSITION etc..
   * @param includeEmptyTrackItems
   */
  getTrackItems(
    trackItemType: Constants.TrackItemType,
    includeEmptyTrackItems: boolean,
  ): AudioClipTrackItem[];

  /**
   * Get the name of the track
   * @readonly
   */
  readonly name: string;

  /**
   * The ID of the track within the TrackGroup
   * @readonly
   */
  readonly id: number;
};

export declare type CaptionTrackStatic = {};

export declare type CaptionTrack = {
  /**
   * sets the mute state of the track to muted/unmuted
   *
   * @param mute
   */
  setMute(mute: boolean): Promise<boolean>;

  /**
   * UUID representing the underlying media type of this track
   */
  getMediaType(): Promise<Guid>;

  /**
   * Index representing the track index of this track within the track group.
   */
  getIndex(): Promise<number>;

  /**
   * Get mute state of the track
   */
  isMuted(): Promise<boolean>;

  /**
   * Returns the track items of the specified media type from the given track
   *
   * @param trackItemType
   * @param includeEmptyTrackItems
   */
  getTrackItems(trackItemType: number, includeEmptyTrackItems: boolean): [];

  /**
   * Get the name of the track
   * @readonly
   */
  readonly name: string;

  /**
   * The ID of the track within the TrackGroup
   * @readonly
   */
  readonly id: number;
};

export declare type ClipProjectItemStatic = {
  /**
   * Cast ProjectItem in to ClipProjectItem
   *
   * @param projectItem
   */
  cast(projectItem: ProjectItem): ClipProjectItem;
};

export declare type ClipProjectItem = {
  /**
   * Get Guid of Input LUT overridden on media
   */
  getInputLUTID(): Promise<string>;

  /**
   * Create action for setting Guid of Input LUT on media. This applies for Video Clips only.
   *
   * @param stringLUTID
   */
  createSetInputLUTIDAction(stringLUTID: string): Action;

  /**
   * Returns true if the project item is a sequence
   */
  isSequence(): Promise<boolean>;

  /**
   * Returns true if Premiere Pro can change the path associated with this project item; otherwise, returns false
   */
  canChangeMediaPath(): Promise<boolean>;

  /**
   * Returns true if the media is offline
   */
  isOffline(): Promise<boolean>;

  /**
   * Indicates whether it is possible to attach a proxy to this project item.
   */
  canProxy(): Promise<boolean>;

  /**
   * Returns the proxy path if the project item has a proxy attached
   */
  getProxyPath(): Promise<string>;

  /**
   * Indicates whether a proxy has already been attached to the project item.
   */
  hasProxy(): Promise<boolean>;

  /**
   * Attach proxy or high resolution footage to projectItem and returns true if successful. Not undoable.
   *
   * @param mediaPath
   * @param isHiRes
   * @param inMakeAlternateLinkInTeamProjects
   */
  attachProxy(
    mediaPath: string,
    isHiRes: boolean,
    inMakeAlternateLinkInTeamProjects?: boolean,
  ): Promise<boolean>;

  /**
   * Returns array of project's items with media paths containing match string
   *
   * @param matchString
   * @param ignoreSubclips
   */
  findItemsMatchingMediaPath(
    matchString: string,
    ignoreSubclips?: boolean,
  ): Promise<ProjectItem[]>;

  /**
   * Updates representation of the media associated with the project item
   */
  refreshMedia(): Promise<boolean>;

  /**
   * Returns an action which sets the media offline
   */
  createSetOfflineAction(): Action;

  /**
   * Get the footage interpretation object for project item
   */
  getFootageInterpretation(): Promise<FootageInterpretation>;

  /**
   * Set the footage interpretation object for project item
   *
   * @param footageInterpretation
   */
  createSetFootageInterpretationAction(
    footageInterpretation: FootageInterpretation,
  ): Action;

  /**
   * Change media file path of projectItem and returns true if successful. Not undoable.
   *
   * @param newPath
   * @param overrideCompatibilityCheck
   */
  changeMediaFilePath(
    newPath: string,
    overrideCompatibilityCheck?: boolean,
  ): Promise<boolean>;

  /**
   * Returns true if the clip Project item is a merged clip
   */
  isMergedClip(): Promise<boolean>;

  /**
   * Returns true if the clip Project item is a multicam clip
   */
  isMulticamClip(): Promise<boolean>;

  /**
   * Get GUID of LUT embedded in media
   */
  getEmbeddedLUTID(): Promise<string>;

  /**
   * Returns an action which sets the scale to frame to true
   */
  createSetScaleToFrameSizeAction(): Action;

  /**
   * Returns action that renames projectItem
   *
   * @param inName
   */
  createSetNameAction(inName: string): Action;

  /**
   * Get color label index of projectItem
   */
  getColorLabelIndex(): Promise<number>;

  /**
   * Create an action for set color label to projectItem by index
   *
   * @param inColorLabelIndex
   */
  createSetColorLabelAction(inColorLabelIndex: number): Action;

  /**
   * Get the parent Project of this projectItem.
   */
  getProject(): Promise<Project>;

  /**
   * Get content type of the Project item
   */
  getContentType(): Promise<Constants.ContentType>;

  /**
   * Get the sequence of the Project item
   */
  getSequence(): Promise<Sequence>;

  /**
   * Get the in point of the Project item
   *
   * @param mediaType Media type can be audio, video or data/caption
   */
  getInPoint(mediaType: Constants.MediaType): Promise<TickTime>;

  /**
   * Get the out point of the Project item
   *
   * @param mediaType Media type can be audio, video or data/caption
   */
  getOutPoint(mediaType: Constants.MediaType): Promise<TickTime>;

  /**
   * Get the media file path of the Project item.
   */
  getMediaFilePath(): Promise<string>;

  /**
   * Get the media file path of the Project item.
   *
   * @param mediaType Media type can be audio, video or data/caption
   */
  getComponentChain(mediaType: Constants.MediaType): Promise<string>;

  /**
   * Returns an action which Sets the in point of the Project item
   *
   * @param tickTime
   */
  createSetInPointAction(tickTime: TickTime): Action;

  /**
   * Returns an action which sets Override pixel aspect ratio
   *
   * @param inNumerator
   * @param inDenominator
   */
  createSetOverridePixelAspectRatioAction(
    inNumerator: number,
    inDenominator: number,
  ): Action;

  /**
   * Returns an action which sets the override frame rate
   *
   * @param inOverriddenFrameRateValue
   */
  createSetOverrideFrameRateAction(inOverriddenFrameRateValue: number): Action;

  /**
   * Returns an action which Sets the in point of the Project item
   *
   * @param tickTime
   */
  createSetOutPointAction(tickTime: TickTime): Action;

  /**
   * Set the in or out point of the Project item
   *
   * @param inPoint
   * @param outPoint
   */
  createSetInOutPointsAction(inPoint: TickTime, outPoint: TickTime): Action;

  /**
   * Create Clear the in or out point of the Project item action
   */
  createClearInOutPointsAction(): Action;

  /**
   * Return media associated with clipProjectItem
   */
  getMedia(): Promise<Media>;

  /**
   * Return originating project path associated with clipProjectItem
   */
  getOriginatingProjectPath(): Promise<string>;

  /**
   * Get the type of the Project Item.
   * @readonly
   */
  readonly type: number;

  /**
   * The name of this project item.
   * @readonly
   */
  readonly name: string;
};

export declare type CloseProjectOptions = {
  /**
   * Constructs a new instance of the CloseProjectOptions class.
   * @constructor
   */
  (): CloseProjectOptions;

  /**
   * Set whether to prompt if a project is dirty on project open/close
   *
   * @param promptIfDirty
   */
  setPromptIfDirty(promptIfDirty: boolean): CloseProjectOptions;

  /**
   * Set whether to show the cancel button on project open/close
   *
   * @param showCancelButton
   */
  setShowCancelButton(showCancelButton: boolean): CloseProjectOptions;

  /**
   * Set whether the app should be prepared to quit when open/closing a project
   *
   * @param isAppBeingPreparedToQuit
   */
  setIsAppBeingPreparedToQuit(
    isAppBeingPreparedToQuit: boolean,
  ): CloseProjectOptions;

  /**
   * Set whether to save your workspaces when opening/closing a project
   *
   * @param isAppBeingPreparedToQuit
   */
  setSaveWorkspace(isAppBeingPreparedToQuit: boolean): CloseProjectOptions;

  /**
   * Get whether a prompt is shown if a project is dirty on project open/close
   * @readonly
   */
  readonly promptIfDirty: boolean;

  /**
   * Get whether the cancel button is shown on project open/close
   * @readonly
   */
  readonly showCancelButton: boolean;

  /**
   * Get whether the app is prepared to quit when open/closing a project
   * @readonly
   */
  readonly isAppBeingPreparedToQuit: boolean;

  /**
   * Get whether your workspaces are saved when opening/closing a project
   * @readonly
   */
  readonly saveWorkspace: boolean;
};

export declare type Color = {
  /**
   * Constructs a new instance of the Color class.
   * @constructor
   *
   * @param [red]
   * @param [green]
   * @param [blue]
   * @param [alpha]
   */
  (red?: number, green?: number, blue?: number, alpha?: number): Color;

  /**
   * Returns true if the given ColorObject is equal to this ColorObject
   *
   * @param colorObject
   */
  equals(colorObject: Color): boolean;

  /**
   * Read/Write property to get/set red value of color object
   */
  red: number;

  /**
   * Read/Write property to get/set green value of color object
   */
  green: number;

  /**
   * Read/Write property to get/set blue value of color object
   */
  blue: number;

  /**
   * Read/Write property to get/set alpha value of color object
   */
  alpha: number;
};

export declare type Component = {
  /**
   * Get a parameter from the component based on the given input index. Parameter indexes are zero-based, and the actual is defined exclusively by the component itself.
   *
   * @param paramIndex
   */
  getParam(paramIndex?: number): ComponentParam;

  /**
   * Returned Promise will be fullfilled with the value of internal matchname for this component
   */
  getMatchName(): Promise<string>;

  /**
   * Returned Promise will be fullfilled with the value of display name for this component
   */
  getDisplayName(): Promise<string>;

  /**
   * Gets the number of param in the component
   */
  getParamCount(): number;
};

export declare type ComponentParam = {
  /**
   * Creates and returns a keyframe initialised with the ComponentParam's type and passed in value. This throws if the passed in value is not compatible with the component param type
   *
   * @param inValue Input could be number, string, boolean, PointF, or Color depend on effect param type
   */
  createKeyframe(inValue: number | string | boolean | PointF | Color): Keyframe;

  /**
   * Gets the value of component Param at the given time
   *
   * @param time The time at which to get the value of the component param
   */
  getValueAtTime(
    time: TickTime,
  ): Promise<number | string | boolean | PointF | Color>;

  /**
   * Find sthe nearest key for the given time
   *
   * @param inTime
   * @param outTime
   */
  findNearestKeyframe(inTime: TickTime, outTime: TickTime): Keyframe;

  /**
   * find the next keyframe for the given time
   *
   * @param inTime
   */
  findNextKeyframe(inTime: TickTime): Keyframe;

  /**
   * find the previous keyframe for the given time
   *
   * @param inTime
   */
  findPreviousKeyframe(inTime: TickTime): Keyframe;

  /**
   * Returns an action which removes keyframe at specific time
   *
   * @param inTime
   * @param UpdateUI
   */
  createRemoveKeyframeAction(inTime: TickTime, UpdateUI?: boolean): Action;

  /**
   * Returns an action which removes keyframe at specific time range
   *
   * @param inTime
   * @param outTime
   * @param UpdateUI
   */
  createRemoveKeyframeRangeAction(
    inTime: TickTime,
    outTime: TickTime,
    UpdateUI?: boolean,
  ): Action;

  /**
   * Creates and returns an action object which can be used to set the value of a non-time varying component
   *
   * @param inKeyFrame
   * @param inSafeForPlayback
   */
  createSetValueAction(
    inKeyFrame: Keyframe,
    inSafeForPlayback?: boolean,
  ): Action;

  /**
   * Creates and returns an action object which can be used to add a keyframe component
   *
   * @param inKeyFrame
   */
  createAddKeyframeAction(inKeyFrame: Keyframe): Action;

  /**
   * Creates and returns an action object to set the component to be time varying
   *
   * @param inTimeVarying
   */
  createSetTimeVaryingAction(inTimeVarying: boolean): Action;

  /**
   * Returned promise will be fullfilled with the start value (keyframe) of the component param
   */
  getStartValue(): Promise<Keyframe>;

  /**
   * Get a list of tickTime for the keyframes of this component param
   */
  getKeyframeListAsTickTimes(): TickTime[];

  /**
   * Get the Keyframe at the given tickTime postion
   *
   * @param time
   */
  getKeyframePtr(time?: TickTime): Keyframe;

  /**
   * Returns true if the parameter value varies over time (for the duration of the item)
   */
  isTimeVarying(): boolean;

  /**
   * Returns an action which sets the interpolation mode of keyframe at the given time
   *
   * @param inTime
   * @param InterpolationMode
   * @param UpdateUI
   */
  createSetInterpolationAtKeyframeAction(
    inTime: TickTime,
    InterpolationMode: number,
    UpdateUI?: boolean,
  ): Action;

  /**
   * Returns bool whether keyframes are supported for this component parameter
   */
  areKeyframesSupported(): Promise<boolean>;

  /**
   * Returns the display name of the component param
   * @readonly
   */
  readonly displayName: string;
};

export declare type CompoundAction = {
  /**
   * Add an action to the compound action
   *
   * @param action
   */
  addAction(action: Action): boolean;

  /**
   * Is the compound action empty?
   * @readonly
   */
  readonly empty: boolean;
};

export declare type EncoderManagerStatic = {
  /**
   * Get the Encoder Manager object.
   */
  getManager(): EncoderManager;

  /**
   * Get the Export File Extension of Input Preset file
   *
   * @param sequence
   * @param presetFilePath
   */
  getExportFileExtension(
    sequence: Sequence,
    presetFilePath: string,
  ): Promise<string>;

  /**
   * Export type used to queue an export job into the Adobe Media Encoder export queue
   * @readonly
   */
  readonly EXPORT_QUEUE_TO_AME: string;

  /**
   * Export type used to queue an export job into the app export queue
   * @readonly
   */
  readonly EXPORT_QUEUE_TO_APP: string;

  /**
   * Export type used to immediately exporting an object
   * @readonly
   */
  readonly EXPORT_IMMEDIATELY: string;

  /**
   * Broadcast when AME is finished rendering
   * @readonly
   */
  readonly EVENT_RENDER_COMPLETE: string;

  /**
   * Broadcast when AME gives back error message
   * @readonly
   */
  readonly EVENT_RENDER_ERROR: string;

  /**
   * Broadcast when AME job is canceled
   * @readonly
   */
  readonly EVENT_RENDER_CANCEL: string;

  /**
   * Broadcast when AME job is queued
   * @readonly
   */
  readonly EVENT_RENDER_QUEUE: string;

  /**
   * Broadcast when AME job is rendering the job
   * @readonly
   */
  readonly EVENT_RENDER_PROGRESS: string;
};

export declare type EncoderManager = {
  /**
   * Export a sequence. If no output file and preset is specified, the sequence will be exported with the applied export settings or standard export rules will be applied.
   *
   * @param sequence
   * @param exportType Constants.ExportType.IMMEDIATELY, Constants.ExportType.QUEUE_TO_AME etc..
   * @param outputFile
   * @param presetFile
   * @param exportFull
   */
  exportSequence(
    sequence: Sequence,
    exportType: Constants.ExportType,
    outputFile?: string,
    presetFile?: string,
    exportFull?: boolean,
  ): Promise<boolean>;

  /**
   * Encode input clipProjectItem in AME
   *
   * @param clipProjectItem
   * @param outputFile
   * @param presetFile
   * @param workArea
   * @param removeUponCompletion
   * @param startQueueImmediately
   */
  encodeProjectItem(
    clipProjectItem: ClipProjectItem,
    outputFile?: string,
    presetFile?: string,
    workArea?: number,
    removeUponCompletion?: boolean,
    startQueueImmediately?: boolean,
  ): Promise<boolean>;

  /**
   * Encode input media file in AME
   *
   * @param filePath
   * @param outputFile
   * @param presetFile
   * @param inPoint
   * @param outPoint
   * @param workArea
   * @param removeUponCompletion
   * @param startQueueImmediately
   */
  encodeFile(
    filePath: string,
    outputFile?: string,
    presetFile?: string,
    inPoint: TickTime,
    outPoint: TickTime,
    workArea?: number,
    removeUponCompletion?: boolean,
    startQueueImmediately?: boolean,
  ): Promise<boolean>;

  /**
   * Check if AME is installed.
   * @readonly
   */
  readonly isAMEInstalled: boolean;
};

export declare type ExporterStatic = {
  /**
   * Exports from a sequence. Supported formats are bmp, dpx, gif, jpg, exr, png, tga and tif
   *
   * @param sequence
   * @param time
   * @param filename Filename to be exported , example 'C:/temp/exportedFrame.png'
   * @param filepath Directory to be exported, example 'C:/temp/'
   * @param width
   * @param height
   */
  exportSequenceFrame(
    sequence: Sequence,
    time: TickTime,
    filename: string,
    filepath: string,
    width: number,
    height: number,
  ): Promise<boolean>;
};

export declare type Exporter = {};

export declare type FolderItemStatic = {
  /**
   * Cast ProjectItem in to FolderItem
   *
   * @param projectItem
   */
  cast(projectItem: ProjectItem): FolderItem;
};

export declare type FolderItem = {
  /**
   * Returns an action that lets users create a new bin.
   *
   * @param name
   * @param makeUnique
   */
  createBinAction(name: string, makeUnique: boolean): Action;

  /**
   * Creates a smart bin with given name and returns the Folder object
   *
   * @param name
   * @param searchQuery
   */
  createSmartBinAction(name: string, searchQuery: string): Action;

  /**
   * Rename the Bin and return true if it's successful
   *
   * @param name
   */
  createRenameBinAction(name: string): Action;

  /**
   * Collection of child items of this folder.
   */
  getItems(): Promise<ProjectItem[]>;

  /**
   * Creates an action that removes the given item from this folder.
   *
   * @param item
   */
  createRemoveItemAction(item: ProjectItem): Action;

  /**
   * Creates an action that moves the given item to the provided folder item newParent.
   *
   * @param item
   * @param newParent
   */
  createMoveItemAction(item: ProjectItem, newParent: FolderItem): Action;

  /**
   * Returns action that renames projectItem
   *
   * @param inName
   */
  createSetNameAction(inName: string): Action;

  /**
   * Get color label index of projectItem
   */
  getColorLabelIndex(): Promise<number>;

  /**
   * Create an action for set color label to projectItem by index
   *
   * @param inColorLabelIndex
   */
  createSetColorLabelAction(inColorLabelIndex: number): Action;

  /**
   * Get the parent Project of this projectItem.
   */
  getProject(): Promise<Project>;

  /**
   * Get the type of the Project Item.
   * @readonly
   */
  readonly type: number;

  /**
   * The name of this project item.
   * @readonly
   */
  readonly name: string;
};

export declare type FootageInterpretation = {
  /**
   * Get frame rate of footage
   */
  getFrameRate(): number;

  /**
   * Set frame rate of footage
   *
   * @param frameRate
   */
  setFrameRate(frameRate: number): boolean;

  /**
   * Get pixel aspect ratio of footage
   */
  getPixelAspectRatio(): number;

  /**
   * Set pixel aspect ratio of footage
   *
   * @param pixelAspectRatio
   */
  setPixelAspectRatio(pixelAspectRatio: number): boolean;

  /**
   * Get field type of footage
   */
  getFieldType(): number;

  /**
   * Set field type of footage
   *
   * @param fieldType
   */
  setFieldType(fieldType: number): boolean;

  /**
   * Get removePullDown property of footage
   */
  getRemovePullDown(): boolean;

  /**
   * Set removePullDown property of footage
   *
   * @param removePulldown
   */
  setRemovePullDown(removePulldown: boolean): boolean;

  /**
   * Get alpha usage type property of footage
   */
  getAlphaUsage(): number;

  /**
   * Set alpha usage type property of footage
   *
   * @param alphaUsage
   */
  setAlphaUsage(alphaUsage: number): boolean;

  /**
   * Get ignore alpha property of footage
   */
  getIgnoreAlpha(): boolean;

  /**
   * Set ignore alpha property of footage
   *
   * @param ignoreAlpha
   */
  setIgnoreAlpha(ignoreAlpha: boolean): boolean;

  /**
   * Get invert alpha property of footage
   */
  getInvertAlpha(): boolean;

  /**
   * Set invert alpha property of footage
   *
   * @param invertAlpha
   */
  setInvertAlpha(invertAlpha: boolean): boolean;

  /**
   * Get vr conform projection type of footage
   */
  getVrConform(): number;

  /**
   * Set vr conform projection type of footage
   *
   * @param vrConform
   */
  setVrConform(vrConform: number): boolean;

  /**
   * Get vr layout type of footage
   */
  getVrLayout(): number;

  /**
   * Set vr layout type of footage
   *
   * @param vrLayOut
   */
  setVrLayout(vrLayOut: number): boolean;

  /**
   * Get vr horizontal view of footage
   */
  getVrHorzView(): number;

  /**
   * Set vr horizontal view of footage
   *
   * @param vrHorzView
   */
  setVrHorzView(vrHorzView: number): boolean;

  /**
   * Get vr vertical view of footage
   */
  getVrVertView(): number;

  /**
   * Set vr horizontal view of footage
   *
   * @param vrVertView
   */
  setVrVertView(vrVertView: number): boolean;

  /**
   * Get input LUTID of footage
   */
  getInputLUTID(): string;

  /**
   * Set input LUTID of footage
   *
   * @param inputLUTID
   */
  setInputLUTID(inputLUTID: string): boolean;

  /**
   * alpha channel none
   * @readonly
   */
  readonly ALPHACHANNEL_NONE: number;

  /**
   * alpha channel straight
   * @readonly
   */
  readonly ALPHACHANNEL_STRAIGHT: number;

  /**
   * alpha channel premultiplied
   * @readonly
   */
  readonly ALPHACHANNEL_PREMULTIPLIED: number;

  /**
   * alpha channel ignore
   * @readonly
   */
  readonly ALPHACHANNEL_IGNORE: number;

  /**
   * default filed type invalid
   * @readonly
   */
  readonly FIELD_TYPE_DEFAULT: number;

  /**
   * field type progressive
   * @readonly
   */
  readonly FIELD_TYPE_PROGRESSIVE: number;

  /**
   * field type upperfirst
   * @readonly
   */
  readonly FIELD_TYPE_UPPERFIRST: number;

  /**
   * field type lowerfirst
   * @readonly
   */
  readonly FIELD_TYPE_LOWERFIRST: number;
};

export declare type FrameRateStatic = {
  /**
   * Create frame rate object with a value
   *
   * @param value
   */
  createWithValue(value: number): FrameRate;
};

export declare type FrameRate = {
  /**
   * Constructs a new instance of the FrameRate class.
   * @constructor
   */
  (): FrameRate;

  /**
   * Returns true if the given FrameRate is equal to this FrameRate object
   *
   * @param frameRate
   */
  equals(frameRate: FrameRate): boolean;

  /**
   * Read/Write property to get/set ticks per frame.
   */
  ticksPerFrame: number;

  /**
   * Get the number of frames per second.
   * @readonly
   */
  readonly value: number;
};

export declare type GuidStatic = {
  /**
   * Create a guid from a string
   *
   * @param stringValue
   */
  fromString(stringValue: string): Guid;
};

export declare type Guid = {
  /**
   * Constructs a new instance of the Guid class.
   * @constructor
   */
  (): Guid;

  /**
   * Return string representation of the GUID
   */
  toString(): string;
};

export declare type IngestSettings = {
  /**
   * Get whether or not ingest is enabled
   */
  getIsIngestEnabled(): Promise<boolean>;

  /**
   * Set whether or not ingest is enabled
   *
   * @param enabled
   */
  setIngestEnabled(enabled: boolean): Promise<boolean>;
};

export declare type KeyframeStatic = {
  /**
   * Linear interpolation mode
   * @readonly
   */
  readonly INTERPOLATION_MODE_LINEAR: number;

  /**
   * Hold interpolation mode
   * @readonly
   */
  readonly INTERPOLATION_MODE_HOLD: number;

  /**
   * Bezier interpolation mode
   * @readonly
   */
  readonly INTERPOLATION_MODE_BEZIER: number;

  /**
   * Time interpolation mode
   * @readonly
   */
  readonly INTERPOLATION_MODE_TIME: number;

  /**
   * Time transition start interpolation mode
   * @readonly
   */
  readonly INTERPOLATION_MODE_TIME_TRANSITION_START: number;

  /**
   * Time transition end interpolation mode
   * @readonly
   */
  readonly INTERPOLATION_MODE_TIME_TRANSITION_END: number;
};

export declare type Keyframe = {
  /**
   * Gets temporal interpolation mode of a keyframe
   */
  getTemporalInterpolationMode(): Promise<number>;

  /**
   * Sets temporal interpolation mode of a keyframe
   *
   * @param temporalInterpolationMode
   */
  setTemporalInterpolationMode(
    temporalInterpolationMode: number,
  ): Promise<boolean>;

  /**
   */
  value: { value: string | number | boolean | Color | PointF };

  /**
   * Get/Set position of a keyframe
   */
  position: TickTime;
};

export declare type MarkerStatic = {
  /**
   * Marker Type: Comment
   * @readonly
   */
  readonly MARKER_TYPE_COMMENT: string;

  /**
   * Marker Type: Chapter
   * @readonly
   */
  readonly MARKER_TYPE_CHAPTER: string;

  /**
   * Marker Type: FLVCuePoint
   * @readonly
   */
  readonly MARKER_TYPE_FLVCUEPOINT: string;

  /**
   * Marker Type: WebLink
   * @readonly
   */
  readonly MARKER_TYPE_WEBLINK: string;
};

export declare type Marker = {
  /**
   * Get color code of the marker.
   */
  getColor(): Color;

  /**
   * Get color index of the marker.
   */
  getColorIndex(): number;

  /**
   * Get comments of the marker.
   */
  getComments(): string;

  /**
   * Get duration time of the marker.
   */
  getDuration(): TickTime;

  /**
   * Get name of the marker.
   */
  getName(): string;

  /**
   * Get url of the marker.
   */
  getUrl(): string;

  /**
   * Get target of the marker. Used together with url for web targets.
   */
  getTarget(): string;

  /**
   * Get type of the marker. e.g. Cue / Track / Subclip / Cart
   */
  getType(): string;

  /**
   * Get start time of the marker.
   */
  getStart(): TickTime;

  /**
   * Return an action to set the color of the marker by the color index
   *
   * @param colorIndex
   */
  createSetColorByIndexAction(colorIndex: number): Action;

  /**
   * Return an action to set the name of the marker.
   *
   * @param name
   */
  createSetNameAction(name: string): Action;

  /**
   * Return an action to set the duration of the marker.
   *
   * @param tickTime
   */
  createSetDurationAction(tickTime: TickTime): Action;

  /**
   * Return an action to set the type of the marker.
   *
   * @param markerType This values can be Scale (0), AnchorToInPoint (1) or AnchorToOutPoint (2)
   */
  createSetTypeAction(markerType: string): Action;

  /**
   * Return an action to set the comments of the marker.
   *
   * @param comments
   */
  createSetCommentsAction(comments: string): Action;
};

export declare type MarkersStatic = {
  /**
   * Returns the Markers object for Sequence Or ProjectItem
   *
   * @param markerOwnerObject
   */
  getMarkers(markerOwnerObject: Sequence | ClipProjectItem): Promise<Markers>;
};

export declare type Markers = {
  /**
   * Get all markers
   *
   * @param filters Marker Type Filter (Optional)
   */
  getMarkers(filters?: string[]): Marker[];

  /**
   * Remove the given marker
   *
   * @param marker
   */
  createRemoveMarkerAction(marker: Marker): Action;

  /**
   * Move the given marker at new time value
   *
   * @param marker
   * @param tickTime
   */
  createMoveMarkerAction(marker: Marker, tickTime: TickTime): Action;

  /**
   * Add a new marker
   *
   * @param Name
   * @param markerType
   * @param startTime
   * @param duration
   * @param comments
   */
  createAddMarkerAction(
    Name: string,
    markerType?: string,
    startTime?: TickTime,
    duration?: TickTime,
    comments?: string,
  ): Action;
};

export declare type Media = {
  /**
   * Returns action that set start of media
   *
   * @param time
   */
  createSetStartAction(time: TickTime): Action;

  /**
   * Get the media start time
   * @readonly
   */
  readonly start: TickTime;

  /**
   * Get the media duration
   * @readonly
   */
  readonly duration: TickTime;
};

export declare type MetadataStatic = {
  /**
   * Get project metadata
   *
   * @param projectItem
   */
  getProjectMetadata(projectItem: ProjectItem): Promise<string>;

  /**
   * Get project XMP metadata
   *
   * @param projectItem
   */
  getXMPMetadata(projectItem: ProjectItem): Promise<string>;

  /**
   * Get set project metadata action
   *
   * @param projectItem
   * @param metadata
   * @param updatedFields
   */
  createSetProjectMetadataAction(
    projectItem: ProjectItem,
    metadata: string,
    updatedFields: string[],
  ): Action;

  /**
   * Get set project XMP metadata action
   *
   * @param projectItem
   * @param metadata
   */
  createSetXMPMetadataAction(
    projectItem: ProjectItem,
    metadata: string,
  ): Action;

  /**
   * Add name and label property to project metadata schema
   *
   * @param name
   * @param label
   * @param type
   */
  addPropertyToProjectMetadataSchema(
    name: string,
    label: string,
    type: number,
  ): Promise<boolean>;

  /**
   * Get project column metadata from project item
   *
   * @param projectItem
   */
  getProjectColumnsMetadata(projectItem: ProjectItem): Promise<string>;

  /**
   * Get project panel metadata
   */
  getProjectPanelMetadata(): Promise<string>;

  /**
   * Set project panel metadata
   *
   * @param metadata
   */
  setProjectPanelMetadata(metadata: string): Promise<boolean>;

  /**
   * Metadata Type: INTEGER
   * @readonly
   */
  readonly METADATA_TYPE_INTEGER: number;

  /**
   * Metadata Type: REAL
   * @readonly
   */
  readonly METADATA_TYPE_REAL: number;

  /**
   * Metadata Type: TEXT
   * @readonly
   */
  readonly METADATA_TYPE_TEXT: number;

  /**
   * Metadata Type: BOOLEAN
   * @readonly
   */
  readonly METADATA_TYPE_BOOLEAN: number;
};

export declare type Metadata = {};

export declare type OpenProjectOptions = {
  /**
   * Set whether to show the convert project dialog on project open/close
   *
   * @param showConvertProjectDialog
   */
  setShowConvertProjectDialog(
    showConvertProjectDialog: boolean,
  ): OpenProjectOptions;

  /**
   * Set whether to show the locate file dialog on project open/close
   *
   * @param showLocateFileDialog
   */
  setShowLocateFileDialog(showLocateFileDialog: boolean): OpenProjectOptions;

  /**
   * Set whether to show the warning file dialog on project open/close
   *
   * @param showConvertProjectDialog
   */
  setShowWarningDialog(showConvertProjectDialog: boolean): OpenProjectOptions;

  /**
   * Set whether to add to MRU list after project changes
   *
   * @param addToMRUList
   */
  setAddToMRUList(addToMRUList: boolean): OpenProjectOptions;

  /**
   * Get whether the convert project dialog is shown on project open/close
   * @readonly
   */
  readonly showConvertProjectDialog: boolean;

  /**
   * Get whether locate file dialog is shown on project open/close
   * @readonly
   */
  readonly showLocateFileDialog: boolean;

  /**
   * Get whether the warning file dialog is shown on project open/close
   * @readonly
   */
  readonly showWarningDialog: boolean;

  /**
   * Get whether to add project changes to MRU list
   * @readonly
   */
  readonly addToMRUList: boolean;
};

export declare type OperationCompleteEventStatic = {
  /**
   * Represents the state when an operation completes successfully.
   * @readonly
   */
  readonly OPERATION_STATE_SUCCESS: number;

  /**
   * Represents the state when an operation is cancelled.
   * @readonly
   */
  readonly OPERATION_STATE_CANCELLED: number;

  /**
   * Represents the state when an operation is failed.
   * @readonly
   */
  readonly OPERATION_STATE_FAILED: number;

  /**
   * Event occurs when a media import operation is complete.
   * @readonly
   */
  readonly EVENT_IMPORT_MEDIA_COMPLETE: string;

  /**
   * Event occurs when a media export operation is complete.
   * @readonly
   */
  readonly EVENT_EXPORT_MEDIA_COMPLETE: string;

  /**
   * Event occurs when an effect is dropped on a trackitem
   * @readonly
   */
  readonly EVENT_EFFECT_DROP_COMPLETE: string;

  /**
   * Event occurs when an effect is drag over a trackitem
   * @readonly
   */
  readonly EVENT_EFFECT_DRAG_OVER: string;

  /**
   * Event occurs when a clip reached its maximum extend limit.
   * @readonly
   */
  readonly EVENT_CLIP_EXTEND_REACHED: string;

  /**
   * Event occurs when a generative extend operation is complete.
   * @readonly
   */
  readonly EVENT_GENERATIVE_EXTEND_COMPLETE: string;
};

export declare type OperationCompleteEvent = {
  /**
   * Indicates the outcome of a completed operation: Success, Cancelled, or Failed.
   * @readonly
   */
  readonly state: number;
};

export declare type PRProductionStatic = {
  /**
   * Get an instance of the currently active production.
   */
  getActiveProduction(): PRProduction;
};

export declare type PRProduction = {
  /**
   * Get the scratch disk settings instance for this production.
   */
  getScratchDiskSettings(): Promise<ScratchDiskSettings>;
};

export declare type PointF = {
  /**
   * Constructs a new instance of the PointF class.
   * @constructor
   *
   * @param [x]
   * @param [y]
   */
  (x?: number, y?: number): PointF;

  /**
   * Get the distance from one point to another point
   *
   * @param point
   */
  distanceTo(point: PointF): number;

  /**
   * Get/Set the x value of a point
   */
  x: number;

  /**
   * Get/Set the y value of a point
   */
  y: number;
};

export declare type PointKeyframe = {
  /**
   */
  value: { value: PointF };

  /**
   * Get/Set position of a keyframe
   */
  position: TickTime;
};

export declare type ProjectStatic = {
  /**
   * Create a new project
   *
   * @param path
   */
  createProject(path: string): Promise<Project>;

  /**
   * Returns true if the file at the given path is openable as a Premiere project
   *
   * @param projectPath
   */
  isProject(projectPath: string): boolean;

  /**
   * Open a project
   *
   * @param path
   * @param openProjectOptions
   */
  open(path: string, openProjectOptions?: OpenProjectOptions): Promise<Project>;

  /**
   * Currently active project.
   */
  getActiveProject(): Promise<Project>;

  /**
   * Get project referenced by given UID
   *
   * @param projectGuid
   */
  getProject(projectGuid: Guid): Project;
};

export declare type Project = {
  /**
   * Get the active sequence of the project
   */
  getActiveSequence(): Promise<Sequence>;

  /**
   * Set the active sequence of the project
   *
   * @param sequence
   */
  setActiveSequence(sequence: Sequence): Promise<boolean>;

  /**
   * Create a new sequence with the default preset path - Parameter presetPath is deprecated, instead use createSequenceWithPresetPath()
   *
   * @param name
   * @param presetPath
   */
  createSequence(name: string, presetPath?: string): Promise<Sequence>;

  /**
   * Create a new sequence with a given name and medias
   *
   * @param name
   * @param clipProjectItems
   * @param targetBin
   */
  createSequenceFromMedia(
    name: string,
    clipProjectItems?: ClipProjectItem[],
    targetBin?: ProjectItem,
  ): Promise<Sequence>;

  /**
   * Get project color settings object
   */
  getColorSettings(): Promise<ProjectColorSettings>;

  /**
   * Delete a given sequence from the project
   *
   * @param sequence
   */
  deleteSequence(sequence: Sequence): Promise<boolean>;

  /**
   * Get current insertion bin
   */
  getInsertionBin(): Promise<ProjectItem>;

  /**
   * Open a sequence and return true if successful.
   *
   * @param sequence
   */
  openSequence(sequence: Sequence): Promise<boolean>;

  /**
   * Close a sequence and return true if successful.
   *
   * @param sequence
   */
  closeSequence(sequence: Sequence): Promise<boolean>;

  /**
   *
   * @param projectPath
   * @param sequenceIds
   */
  importSequences(projectPath: string, sequenceIds?: Guid[]): Promise<boolean>;

  /**
   *
   * @param aepPath
   * @param compNames
   * @param TargetBin
   */
  importAEComps(
    aepPath: string,
    compNames: string[],
    TargetBin?: ProjectItem,
  ): Promise<boolean>;

  /**
   *
   * @param aepPath
   * @param TargetBin
   */
  importAllAEComps(aepPath: string, TargetBin?: ProjectItem): Promise<boolean>;

  /**
   * Import files in root/target bin of the project
   *
   * @param filePaths
   * @param suppressUI
   * @param targetBin
   * @param asNumberedStills
   */
  importFiles(
    filePaths: string[],
    suppressUI?: boolean,
    targetBin?: ProjectItem,
    asNumberedStills?: boolean,
  ): Promise<boolean>;

  /**
   * Close a project
   *
   * @param closeProjectOptions
   */
  close(closeProjectOptions?: CloseProjectOptions): Promise<boolean>;

  /**
   * Save the project
   */
  save(): Promise<boolean>;

  /**
   * Save the project at the provided path
   *
   * @param path
   */
  saveAs(path: string): Promise<boolean>;

  /**
   * Get sequence by id from the project
   *
   * @param guid
   */
  getSequence(guid: Guid): Sequence;

  /**
   * Get an array of all sequences in this project.
   */
  getSequences(): Promise<Sequence[]>;

  /**
   * The root item of the project which contains all items of the project on the lowest level.
   */
  getRootItem(): Promise<FolderItem>;

  /**
   * Pause growing of files instead swap the files
   *
   * @param pause
   */
  pauseGrowing(pause: boolean): Promise<boolean>;

  /**
   * Execute undoable transaction by passing compound action
   *
   * @param callback
   * @param undoString?
   */
  executeTransaction(
    callback: (compoundAction: CompoundAction) => void,
    undoString?: string,
  ): boolean;

  /**
   * Get a read/upgrade locked access to Project, project state will not change during the execution of callback function. Can call executeTransaction while having locked access.
   *
   * @param callback
   */
  lockedAccess(callback: () => void): void;

  /**
   * The unique identifier of the project.
   * @readonly
   */
  readonly guid: Guid;

  /**
   * The project name.
   * @readonly
   */
  readonly name: string;

  /**
   * The absolute file path to the project file.
   * @readonly
   */
  readonly path: string;
};

export declare type ProjectClosedEventStatic = {
  /**
   * Event occurs when project was closed.
   * @readonly
   */
  readonly EVENT_CLOSED: string;
};

export declare type ProjectClosedEvent = {
  /**
   * The project name.
   * @readonly
   */
  readonly name: string;

  /**
   * The absolute file path to the project file.
   * @readonly
   */
  readonly path: string;

  /**
   * The unique identifier of the project.
   * @readonly
   */
  readonly id: string;
};

export declare type ProjectColorSettings = {
  /**
   * Get all the graphics white luminance as array of values
   */
  getSupportedGraphicsWhiteLuminances(): Promise<number[]>;

  /**
   * Get the graphics white luminance value
   */
  getGraphicsWhiteLuminance(): Promise<number>;
};

export declare type ProjectConverterStatic = {
  /**
   * Export a sequence as Final Cut Pro XML to the specified output file path.
   *
   * @param sequence
   * @param outputFilePath
   * @param suppressUI
   */
  exportAsFinalCutProXML(
    sequence: Sequence,
    outputFilePath: string,
    suppressUI?: boolean,
  ): Promise<boolean>;

  /**
   * Export a sequence as OpenTimelineIO to the specified output file path.
   *
   * @param sequence
   * @param outputFilePath
   * @param suppressUI
   */
  exportAsOpenTimelineIO(
    sequence: Sequence,
    outputFilePath: string,
    suppressUI?: boolean,
  ): Promise<boolean>;
};

export declare type ProjectConverter = {};

export declare type ProjectEventStatic = {
  /**
   * Event occurs when project was opened.
   * @readonly
   */
  readonly EVENT_OPENED: string;

  /**
   * Event occurs when the active project has changed
   * @readonly
   */
  readonly EVENT_ACTIVATED: string;

  /**
   * Event occurs when the project dirty state changed.
   * @readonly
   */
  readonly EVENT_DIRTY: string;
};

export declare type ProjectEvent = {
  /**
   * The project name.
   * @readonly
   */
  readonly name: string;

  /**
   * The absolute file path to the project file.
   * @readonly
   */
  readonly path: string;

  /**
   * The unique identifier of the project.
   * @readonly
   */
  readonly id: string;

  /**
   * The project object.
   * @readonly
   */
  readonly project: Project;
};

export declare type ProjectItemStatic = {
  /**
   * Cast FolderItem or ClipProjectItem in to ProjectItem
   *
   * @param item
   */
  cast(item: FolderItem | ClipProjectItem): ProjectItem;

  /**
   * Project item type for clips.
   * @readonly
   */
  readonly TYPE_CLIP: number;

  /**
   * Project item type for bins/folders.
   * @readonly
   */
  readonly TYPE_BIN: number;

  /**
   * Project item type for the root container.
   * @readonly
   */
  readonly TYPE_ROOT: number;

  /**
   * Project item type for generic files.
   * @readonly
   */
  readonly TYPE_FILE: number;

  /**
   * Project item type for styles.
   * @readonly
   */
  readonly TYPE_STYLE: number;

  /**
   * Project item type for compound clips.
   * @readonly
   */
  readonly TYPE_COMPOUND: number;
};

export declare type ProjectItem = {
  /**
   * Returns action that renames projectItem
   *
   * @param inName
   */
  createSetNameAction(inName: string): Action;

  /**
   * Get color label index of projectItem
   */
  getColorLabelIndex(): Promise<number>;

  /**
   * Create an action for set color label to projectItem by index
   *
   * @param inColorLabelIndex
   */
  createSetColorLabelAction(inColorLabelIndex: number): Action;

  /**
   * Get the parent Project of this projectItem.
   */
  getProject(): Promise<Project>;

  /**
   * Get id of projectItem
   */
  getId(): string;

  /**
   * Get parent FolderItem of projectItem
   */
  getParentBin(): FolderItem;

  /**
   * Get the type of the Project Item.
   * @readonly
   */
  readonly type: number;

  /**
   * The name of this project item.
   * @readonly
   */
  readonly name: string;
};

export declare type ProjectItemSelection = {
  /**
   * Get the project items that is represented by this selection.
   */
  getItems(): Promise<ProjectItem[]>;
};

export declare type ProjectSettingsStatic = {
  /**
   * Returns an action which sets ScratchDiskSetting
   *
   * @param project
   * @param scratchDiskSettings
   */
  createSetScratchDiskSettingsAction(
    project: Project,
    scratchDiskSettings: ScratchDiskSettings,
  ): Action;

  /**
   * Returns project ScratchDiskSettings
   *
   * @param project
   */
  getScratchDiskSettings(project: Project): Promise<ScratchDiskSettings>;

  /**
   * Returns project ingest settings
   *
   * @param project
   */
  getIngestSettings(project: Project): Promise<IngestSettings>;

  /**
   * Returns an action which sets IngestSettings
   *
   * @param project
   * @param ingestSettings
   */
  createSetIngestSettingsAction(
    project: Project,
    ingestSettings: IngestSettings,
  ): Action;
};

export declare type ProjectSettings = {};

export declare type ProjectUtilsStatic = {
  /**
   * Get array of selected project items in project view
   *
   * @param project
   */
  getSelection(project: Project): Promise<ProjectItemSelection>;

  /**
   * Get array of project view ids
   */
  getProjectViewIds(): Promise<Guid[]>;

  /**
   * Get project based on input view guid
   *
   * @param guid
   */
  getProjectFromViewId(guid: Guid): Promise<Project>;

  /**
   * Get array of selected projectItem based on input view guid
   *
   * @param guid
   */
  getSelectionFromViewId(guid: Guid): Promise<ProjectItemSelection>;
};

export declare type ProjectUtils = {};

export declare type PropertiesStatic = {
  /**
   * Return Property Owner Object
   *
   * @param propertyOwnerObject This can also be object instance of Project, Sequence etc..
   */
  getProperties(propertyOwnerObject: Project | Sequence): Promise<Properties>;

  /**
   * Property is persistent in backend and shared across cloud project.
   * @readonly
   */
  readonly PROPERTY_PERSISTENT: number;

  /**
   * Property is not persisted and will be cleared when the project closes.
   * @readonly
   */
  readonly PROPERTY_NON_PERSISTENT: number;
};

export declare type Properties = {
  /**
   * Get named value as integer number
   *
   * @param name
   */
  getValueAsInt(name: string): number;

  /**
   * Get named value as float number
   *
   * @param name
   */
  getValueAsFloat(name: string): number;

  /**
   * Get named value as boolean
   *
   * @param name
   */
  getValueAsBool(name: string): boolean;

  /**
   * Get named value in native string form
   *
   * @param name
   */
  getValue(name: string): string;

  /**
   * Create an action to set a named value through scripting. The parameters are <name, value (number, boolean or string), persistence flag>. This method can fail if e.g. the underlying properties object does not support action based setting of properties.
   *
   * @param name property name
   * @param value Value to set for the property key
   * @param persistenceFlag Indicates whether the property should be persisted or not
   */
  createSetValueAction(
    name: string,
    value: boolean | string | number,
    persistenceFlag: Constants.PropertyType,
  ): Action;

  /**
   * Check if a named value exists under this name.
   *
   * @param name
   */
  hasValue(name: string): boolean;

  /**
   * Create an action to clear the value with the given name. This method can fail if e.g. the underlying properties object does not support action based setting of properties.
   *
   * @param name
   */
  createClearValueAction(name: string): Action;
};

export declare type RectF = {
  /**
   * Constructs a new instance of the RectF class.
   * @constructor
   */
  (): RectF;

  /**
   * Get/Set the width of a rect
   */
  width: number;

  /**
   * Get/Set the height of a rect
   */
  height: number;
};

export declare type ScratchDiskSettingsStatic = {
  /**
   * Folder Type: CAPTURED
   * @readonly
   */
  readonly FOLDERTYPE_CAPTURE: string;

  /**
   * Folder Type: VIDEOPREVIEW
   * @readonly
   */
  readonly FOLDERTYPE_VIDEO_PREVIEW: string;

  /**
   * Folder Type: AUDIOPREVIEW
   * @readonly
   */
  readonly FOLDERTYPE_AUDIO_PREVIEW: string;

  /**
   * Folder Type: AUTOSAVE
   * @readonly
   */
  readonly FOLDERTYPE_AUTO_SAVE: string;

  /**
   * Folder Type: CCLLIBRARIES
   * @readonly
   */
  readonly FOLDERTYPE_CCL_LIBRARIES: string;

  /**
   * Folder Type: CAPSULEMEDIA
   * @readonly
   */
  readonly FOLDERTYPE_CAPSULE_MEDIA: string;

  /**
   * Folder: SAMEASPROJECT
   * @readonly
   */
  readonly FOLDER_SAME_AS_PROJECT: string;

  /**
   * Folder: MYDOCUMNETS
   * @readonly
   */
  readonly FOLDER_MY_DOCUMNETS: string;
};

export declare type ScratchDiskSettings = {
  /**
   * Sets project ScratchDisk Path
   *
   * @param ScratchDiskType
   * @param ScratchDiskValue
   */
  setScratchDiskPath(
    ScratchDiskType: Constants.ScratchDiskFolderType,
    ScratchDiskValue: Constants.ScratchDiskFolder,
  ): boolean;

  /**
   * Gets the scratchDisk location for specific disktype - may return symbolic paths for reserved types like 'MyDocuments'
   *
   * @param ScratchDiskType
   */
  getScratchDiskPath(ScratchDiskType: Constants.ScratchDiskFolderType): string;
};

export declare type SequenceStatic = {};

export declare type Sequence = {
  /**
   * Get video time display format of this sequence
   */
  getSequenceVideoTimeDisplayFormat(): Promise<TimeDisplay>;

  /**
   * Get audio time display format of this sequence
   */
  getSequenceAudioTimeDisplayFormat(): Promise<TimeDisplay>;

  /**
   * Get the player's current position
   */
  getPlayerPosition(): Promise<TickTime>;

  /**
   * Set the player's current position
   *
   * @param positionTime
   */
  setPlayerPosition(positionTime?: TickTime): Promise<boolean>;

  /**
   * Clears TrackItem Selection
   */
  clearSelection(): Promise<boolean>;

  /**
   * Updates sequence selection using the given track item selection.
   *
   * @param trackItemSelection
   */
  setSelection(trackItemSelection: TrackItemSelection): Promise<boolean>;

  /**
   * Get video track count from this sequence
   */
  getVideoTrackCount(): Promise<number>;

  /**
   * Get audio track count from this sequence
   */
  getAudioTrackCount(): Promise<number>;

  /**
   * Get caption track count from this sequence
   */
  getCaptionTrackCount(): Promise<number>;

  /**
   * Get video track from track index
   *
   * @param trackIndex
   */
  getVideoTrack(trackIndex: number): Promise<VideoTrack>;

  /**
   * Get audio track from track index
   *
   * @param trackIndex
   */
  getAudioTrack(trackIndex: number): Promise<AudioTrack>;

  /**
   * Get caption track from track index
   *
   * @param trackIndex
   */
  getCaptionTrack(trackIndex: number): Promise<CaptionTrack>;

  /**
   * Get sequence settings object
   */
  getSettings(): Promise<SequenceSettings>;

  /**
   * Returns action that set sequence settings
   *
   * @param sequenceSettings
   */
  createSetSettingsAction(sequenceSettings: SequenceSettings): Action;

  /**
   * Creates an action to clone the given sequence
   */
  createCloneAction(): Action;

  /**
   * Returns a new sequence, which is a sub-sequence of the existing sequence
   *
   * @param ignoreTrackTargeting
   */
  createSubsequence(ignoreTrackTargeting?: boolean): Promise<Sequence>;

  /**
   * Returns whether or not the sequence is done analyzing for video effects
   */
  isDoneAnalyzingForVideoEffects(): Promise<boolean>;

  /**
   * Time representing the zero point of the sequence.
   */
  getZeroPoint(): Promise<TickTime>;

  /**
   * Time representing the end of the sequence
   */
  getEndTime(): Promise<TickTime>;

  /**
   * Get time representing the inPoint of sequence.
   */
  getInPoint(): Promise<TickTime>;

  /**
   * Get time representing the inPoint of sequence.
   */
  getOutPoint(): Promise<TickTime>;

  /**
   * Create SetInPointAction for sequence
   *
   * @param tickTime
   */
  createSetInPointAction(tickTime: TickTime): Action;

  /**
   * Create an action to set an InPoint for the sequence
   *
   * @param tickTime
   */
  createSetZeroPointAction(tickTime: TickTime): Action;

  /**
   * Create SetOutPointAction for sequence
   *
   * @param tickTime
   */
  createSetOutPointAction(tickTime: TickTime): Action;

  /**
   * Get the associated projectItem of the sequence.
   */
  getProjectItem(): Promise<ProjectItem>;

  /**
   * Returns the current selection group of the sequence.
   */
  getSelection(): Promise<TrackItemSelection>;

  /**
   * Gets the size of the frame
   */
  getFrameSize(): Promise<RectF>;

  /**
   * Gets the time base of sequence
   */
  getTimebase(): Promise<string>;

  /**
   * The unique identifier of the sequence.
   * @readonly
   */
  readonly guid: Guid;

  /**
   * The sequence name.
   * @readonly
   */
  readonly name: string;
};

export declare type SequenceEditorStatic = {
  /**
   * Get Sequence Editor reference for editing the sequence timeline
   *
   * @param sequenceObject
   */
  getEditor(sequenceObject: Sequence): SequenceEditor;

  /**
   * Get local directory path to adobe mogrt files
   */
  getInstalledMogrtPath(): Promise<string>;
};

export declare type SequenceEditor = {
  /**
   * Create remove action for sequence
   *
   * @param trackItemSelection
   * @param ripple
   * @param mediaType
   * @param shiftOverLapping
   */
  createRemoveItemsAction(
    trackItemSelection: TrackItemSelection,
    ripple: boolean,
    mediaType: Constants.MediaType,
    shiftOverLapping?: boolean,
  ): Action;

  /**
   * Create insert ProjectItem into Sequence Action. Note: If you pass a track index greater than the number of existing tracks, a new track will be created.
   *
   * @param projectItem
   * @param time
   * @param videoTrackIndex
   * @param audioTrackIndex
   * @param limitShift
   */
  createInsertProjectItemAction(
    projectItem: ProjectItem,
    time: TickTime,
    videoTrackIndex: number,
    audioTrackIndex: number,
    limitShift: boolean,
  ): Action;

  /**
   * Create overwrite Sequence with ProjectItem Action
   *
   * @param projectItem
   * @param time
   * @param videoTrackIndex
   * @param audioTrackIndex
   */
  createOverwriteItemAction(
    projectItem: ProjectItem,
    time: TickTime,
    videoTrackIndex: number,
    audioTrackIndex: number,
  ): Action;

  /**
   * Duplicate trackItem using an insert or overwrite edit method to a destination track. Target track and start time of trackItem is determined using an offset value from the original trackItem position.
   *
   * @param trackItem
   * @param timeOffset
   * @param videoTrackVerticalOffset
   * @param audioTrackVerticalOffset
   * @param alignToVideo
   * @param isInsert
   */
  createCloneTrackItemAction(
    trackItem: VideoClipTrackItem | AudioClipTrackItem,
    timeOffset: TickTime,
    videoTrackVerticalOffset: number,
    audioTrackVerticalOffset: number,
    alignToVideo: boolean,
    isInsert: boolean,
  ): Action;

  /**
   * Insert input MGT into sequence with time and index defined
   *
   * @param inMGTPath
   * @param inTime
   * @param inVideoTrackIndex
   * @param inAudioTrackIndex
   */
  insertMogrtFromPath(
    inMGTPath: string,
    inTime: TickTime,
    inVideoTrackIndex: number,
    inAudioTrackIndex: number,
  ): (VideoClipTrackItem | AudioClipTrackItem)[];

  /**
   * Insert input MGT into sequence with time and index defined
   *
   * @param inLibraryName
   * @param inElementName
   * @param inTime
   * @param inVideoTrackIndex
   * @param inAudioTrackIndex
   */
  insertMogrtFromLibrary(
    inLibraryName: string,
    inElementName: string,
    inTime: TickTime,
    inVideoTrackIndex: number,
    inAudioTrackIndex: number,
  ): (VideoClipTrackItem | AudioClipTrackItem)[];
};

export declare type SequenceSettingsStatic = {
  /**
   * Square Pixels (1.0)
   * @readonly
   */
  readonly PAR_SQUARE: string;

  /**
   * DV NTSC (0.9091)
   * @readonly
   */
  readonly PAR_DVNTSC: string;

  /**
   * DV NTSC Widescreen 16:9 (1.2121)
   * @readonly
   */
  readonly PAR_DVNTSCWide: string;

  /**
   * DV PAL (1.0940)
   * @readonly
   */
  readonly PAR_DVPAL: string;

  /**
   * DV PAL Widescreen 16:9 (1.4587)
   * @readonly
   */
  readonly PAR_DVPALWide: string;

  /**
   * Anamorphic 2:1 (2.0)
   * @readonly
   */
  readonly PAR_Anamorphic: string;

  /**
   * HD Anamorphic 1080 (1.333)
   * @readonly
   */
  readonly PAR_HDAnamorphic1080: string;

  /**
   * DVCPRO HD (1.5)
   * @readonly
   */
  readonly PAR_DVCProHD: string;

  /**
   * Video field type progressive
   * @readonly
   */
  readonly VIDEO_FIELDTYPE_PROGRESSIVE: number;

  /**
   * Video field type upper first
   * @readonly
   */
  readonly VIDEO_FIELDTYPE_UPPER_FIRST: number;

  /**
   * Video field type lower first
   * @readonly
   */
  readonly VIDEO_FIELDTYPE_LOWER_FIRST: number;

  /**
   * 23.976 fps TimeCode
   * @readonly
   */
  readonly VIDEO_DISPLAY_FORMAT_23976: number;

  /**
   * 25 fps TimeCode
   * @readonly
   */
  readonly VIDEO_DISPLAY_FORMAT_25: number;

  /**
   * 29.97 fps TimeCode
   * @readonly
   */
  readonly VIDEO_DISPLAY_FORMAT_2997: number;

  /**
   * 29.97 fps Non-Drop-Frame TimeCode
   * @readonly
   */
  readonly VIDEO_DISPLAY_FORMAT_2997_NON_DROP: number;

  /**
   * Feet+Frame 16mm
   * @readonly
   */
  readonly VIDEO_DISPLAY_FORMAT_16mm: number;

  /**
   * Feet+Frame 35mm
   * @readonly
   */
  readonly VIDEO_DISPLAY_FORMAT_35mm: number;

  /**
   * Frames
   * @readonly
   */
  readonly VIDEO_DISPLAY_FORMAT_FRAMES: number;

  /**
   * Audio Channel Type Mono
   * @readonly
   */
  readonly AUDIO_CHANNEL_TYPE_MONO: number;

  /**
   * Audio Channel Type Stereo
   * @readonly
   */
  readonly AUDIO_CHANNEL_TYPE_STEREO: number;

  /**
   * Audio Channel Type 5.1
   * @readonly
   */
  readonly AUDIO_CHANNEL_TYPE_51: number;

  /**
   * Audio Channel Type Multi
   * @readonly
   */
  readonly AUDIO_CHANNEL_TYPE_MULTI: number;

  /**
   * Audio Display format: Audio Sample Timecode
   * @readonly
   */
  readonly AUDIO_DISPLAY_FORMAT_SAMPLE_RATE: number;

  /**
   * Audio Display format miliseconds
   * @readonly
   */
  readonly AUDIO_DISPLAY_FORMAT_MILISECONDS: number;
};

export declare type SequenceSettings = {
  /**
   * Find if maximum bit depth is set
   */
  getMaximumBitDepth(): Promise<boolean>;

  /**
   * Set maximum bit depth to true/false
   *
   * @param useMaxBitDepth
   */
  setMaximumBitDepth(useMaxBitDepth: boolean): Promise<boolean>;

  /**
   * Find if maximum render quality is set
   */
  getMaxRenderQuality(): Promise<boolean>;

  /**
   * Set maximum render quality to true/false
   *
   * @param useMaxRenderQuality
   */
  setMaxRenderQuality(useMaxRenderQuality: boolean): Promise<boolean>;

  /**
   * Get number of channels in the sequence
   */
  getAudioChannelCount(): Promise<number>;

  /**
   * Get Audio channel type of sequence. Could be 0 (Mono), 1 (Stereo), 2 (5.1), or 3 (multichannel)
   */
  getAudioChannelType(): Promise<number>;

  /**
   * Get Audio display format
   */
  getAudioDisplayFormat(): Promise<TimeDisplay>;

  /**
   * Set audio display format of sequence.
   *
   * @param audioDisplay
   */
  setAudioDisplayFormat(audioDisplay: TimeDisplay): Promise<boolean>;

  /**
   * Get audio sample rate
   */
  getAudioSampleRate(): Promise<FrameRate>;

  /**
   * Set audio sample rate
   *
   * @param inRate
   */
  setAudioSampleRate(inRate: FrameRate): Promise<boolean>;

  /**
   * Get Video display format
   */
  getVideoDisplayFormat(): Promise<TimeDisplay>;

  /**
   * Set video display format of sequence
   *
   * @param audioDisplay
   */
  setVideoDisplayFormat(audioDisplay: TimeDisplay): Promise<boolean>;

  /**
   * Get video field type in the sequence
   */
  getVideoFieldType(): Promise<number>;

  /**
   * Set video field type in sequence
   *
   * @param videoFiledType
   */
  setVideoFieldType(videoFiledType: number): Promise<boolean>;

  /**
   * Get video frame rate in the sequence
   */
  getVideoFrameRate(): FrameRate;

  /**
   * Set video frame rate in the sequence
   *
   * @param inVideoFrameRate
   */
  setVideoFrameRate(inVideoFrameRate: FrameRate): boolean;

  /**
   * Get video frame rect in the sequence
   */
  getVideoFrameRect(): Promise<RectF>;

  /**
   * Set video frame rect in sequence
   *
   * @param inVideoFrameRect
   */
  setVideoFrameRect(inVideoFrameRect: RectF): Promise<boolean>;

  /**
   * Get Video display format
   */
  getVideoPixelAspectRatio(): Promise<string>;

  /**
   * Set video display format of sequence
   *
   * @param inPixelAspectRatio
   */
  setVideoPixelAspectRatio(inPixelAspectRatio: string): Promise<boolean>;

  /**
   * Get if composite in linear color is checked
   */
  getCompositeInLinearColor(): Promise<boolean>;

  /**
   * Set if composite in linear color is checked
   *
   * @param useCompositeInLinearColor
   */
  setCompositeInLinearColor(
    useCompositeInLinearColor: boolean,
  ): Promise<boolean>;

  /**
   * Get editing mode of sequence
   */
  getEditingMode(): Promise<string>;

  /**
   * Set editing mode of sequence
   *
   * @param inEditingModeName
   */
  setEditingMode(inEditingModeName: string): Promise<boolean>;

  /**
   * Get preview file format of sequence
   */
  getPreviewFileFormat(): Promise<string>;

  /**
   * Set preview file format of sequence
   *
   * @param inPreviewCodec
   */
  setPreviewFileFormat(inPreviewCodec: string): Promise<boolean>;

  /**
   * Get preview codec of sequence
   */
  getPreviewCodec(): Promise<string>;

  /**
   * Set preview codec of sequence
   *
   * @param inPreviewCodec
   */
  setPreviewCodec(inPreviewCodec: string): Promise<boolean>;

  /**
   * Get preview video frame rect in the sequence
   */
  getPreviewFrameRect(): Promise<RectF>;

  /**
   * Set preview video frame rect in sequence
   *
   * @param inPreviewVideoRect
   */
  setPreviewFrameRect(inPreviewVideoRect: RectF): Promise<boolean>;
};

export declare type SequenceUtilsStatic = {
  /**
   * Performs cut detection on the sequence selection
   *
   * @param clipOperation
   * @param trackItemSelection
   */
  performSceneEditDetectionOnSelection(
    clipOperation: string,
    trackItemSelection: TrackItemSelection,
  ): Promise<boolean>;

  /**
   * ApplyCuts
   * @readonly
   */
  readonly SEQUENCE_OPERATION_APPLYCUT: string;

  /**
   * CreateMarkers
   * @readonly
   */
  readonly SEQUENCE_OPERATION_CREATEMARKER: string;

  /**
   * CreateSubclips
   * @readonly
   */
  readonly SEQUENCE_OPERATION_CREATESUBCLIP: string;
};

export declare type SequenceUtils = {};

export declare type SnapEventStatic = {
  /**
   * Event occurs a user scrub on timeline over keyframes when shift key is applied.
   * @readonly
   */
  readonly EVENT_SNAP_TO_KEYFRAME: string;

  /**
   * Event occurs a user scrub on timeline and snaps to various track item alignments.
   * @readonly
   */
  readonly EVENT_SNAP_TO_TRACKITEM: string;

  /**
   * Event occurs object is snapped to guildelines when holding the Cmd/Ctrl key.
   * @readonly
   */
  readonly EVENT_SNAP_TO_GUIDES: string;

  /**
   * Event occurs when the razor tool hovers over the playhead and snaps into position for a cut.
   * @readonly
   */
  readonly EVENT_SNAP_RAZOR_TO_PLAYHEAD: string;

  /**
   * Event occurs when the razor tool hovers over the all types of markers and snaps into position for a cut.
   * @readonly
   */
  readonly EVENT_SNAP_RAZOR_TO_MARKER: string;

  /**
   * Event occurs when the playhead snaps into track-item edges.
   * @readonly
   */
  readonly EVENT_SNAP_PLAYHEAD_TO_TRACKITEM_EDGE: string;
};

export declare type SnapEvent = {};

export declare type SourceMonitorStatic = {
  /**
   * Open the item at the specified path and send to the Source Monitor for preview
   *
   * @param filePath
   */
  openFilePath(filePath: string): Promise<boolean>;

  /**
   * Open input projectItem on Source Monitor
   *
   * @param projectItem
   */
  openProjectItem(projectItem: ProjectItem): Promise<boolean>;

  /**
   * Close clip on Source Monitor
   */
  closeClip(): Promise<boolean>;

  /**
   * Close all clips on Source Monitor
   */
  closeAllClips(): Promise<boolean>;

  /**
   * Get position of source monitor in time
   */
  getPosition(): Promise<TickTime>;

  /**
   * Play clip at source monitor with input speed
   *
   * @param speed
   */
  play(speed?: number): Promise<boolean>;

  /**
   * Get projectItem at source monitor
   */
  getProjectItem(): Promise<ProjectItem>;
};

export declare type SourceMonitor = {};

export declare type TextSegmentsStatic = {
  /**
   * Import text segments in JSON format for handling via callback.
   *
   * @param json
   * @param undefined
   */
  importFromJSON(
    json: string,
    callback1: (importedTranscription: TextSegments) => void,
  ): boolean;
};

export declare type TextSegments = {};

export declare type TickTimeStatic = {
  /**
   * Constructs a TickTime object with a frame and a frame rate.
   *
   * @param frameCount
   * @param frameRate
   */
  createWithFrameAndFrameRate(
    frameCount: number,
    frameRate: FrameRate,
  ): TickTime;

  /**
   * Constructs a TickTime object with seconds.
   *
   * @param seconds
   */
  createWithSeconds(seconds: number): TickTime;

  /**
   * Constructs a TickTime object with ticks as a string.
   *
   * @param ticks
   */
  createWithTicks(ticks: string): TickTime;

  /**
   * Zero Tick Time Constant
   * @readonly
   */
  readonly TIME_ZERO: TickTime;

  /**
   * One Second Tick Time Constant
   * @readonly
   */
  readonly TIME_ONE_SECOND: TickTime;

  /**
   * One Second Tick Time Constant
   * @readonly
   */
  readonly TIME_ONE_MINUTE: TickTime;

  /**
   * One Hour Tick Time Constant
   * @readonly
   */
  readonly TIME_ONE_HOUR: TickTime;

  /**
   * Max Tick Time Constant
   * @readonly
   */
  readonly TIME_MAX: TickTime;

  /**
   * Min Tick Time Constant
   * @readonly
   */
  readonly TIME_MIN: TickTime;

  /**
   * Invalid Tick Time Constant
   * @readonly
   */
  readonly TIME_INVALID: TickTime;
};

export declare type TickTime = {
  /**
   * Constructs a new instance of the TickTime class.
   * @constructor
   */
  (): TickTime;

  /**
   * Returns true if the given TickTime is equal to the TickTime object
   *
   * @param tickTime
   */
  equals(tickTime: TickTime): boolean;

  /**
   * AlignToNearestFrame will return a TickTime that is aligned to the nearest frame boundary greater than or less than the given time, for a given frame rate by rounding any fractional portion.
   *
   * @param frameRate
   */
  alignToNearestFrame(frameRate: FrameRate): TickTime;

  /**
   * alignToFrame will return a TickTime that is aligned to the nearest frame boundary less than the given time, for a given frame rate by rounding any fractional portion.
   *
   * @param frameRate
   */
  alignToFrame(frameRate: FrameRate): TickTime;

  /**
   * Add another TickTime to this one and return it. This TickTime is not modified.
   *
   * @param tickTime
   */
  add(tickTime: TickTime): TickTime;

  /**
   * Subtract another TickTime from this one and return it. This TickTime is not modified.
   *
   * @param tickTime
   */
  subtract(tickTime: TickTime): TickTime;

  /**
   * Multiply this TickTime with a factor and return it. This TickTime is not modified.
   *
   * @param factor
   */
  multiply(factor: number): TickTime;

  /**
   * Divide this TickTime by a divisor and return it. In case of a division by zero, TIME_INVALID is returned. This TickTime is not modified.
   *
   * @param divisor
   */
  divide(divisor: number): TickTime;

  /**
   * Get the TickTime in seconds
   * @readonly
   */
  readonly seconds: number;

  /**
   * Get the TickTime in ticks as a string
   * @readonly
   */
  readonly ticks: string;

  /**
   * Get the TickTime in ticks as a number
   * @readonly
   */
  readonly ticksNumber: number;
};

export declare type TimeDisplay = {
  /**
   * Read/Write property to get/set the time display type numeric code
   */
  type: number;
};

export declare type TrackItemSelectionStatic = {
  /**
   * Create empty selection
   *
   * @param undefined
   */
  createEmptySelection(
    callback0: (selection: TrackItemSelection) => void,
  ): boolean;
};

export declare type TrackItemSelection = {
  /**
   * Add a track item to this selection
   *
   * @param trackItem trackItem to be added to selection
   * @param skipDuplicateCheck
   */
  addItem(
    trackItem: VideoClipTrackItem | AudioClipTrackItem,
    skipDuplicateCheck?: boolean,
  ): boolean;

  /**
   * Remove a track item from this selection
   *
   * @param trackItem trackItem to be removed from selection
   */
  removeItem(trackItem: VideoClipTrackItem | AudioClipTrackItem): boolean;

  /**
   * return list of trackItems inside of trackItemSelection
   */
  getTrackItems(): Promise<(VideoClipTrackItem | AudioClipTrackItem)[]>;
};

export declare type TransitionFactoryStatic = {
  /**
   * Creates a new video filter component based on the input matchName
   *
   * @param matchName
   */
  createVideoTransition(matchName: string): VideoTransition;

  /**
   * Return a promise which will be fullfilled with an array of video transition matchnames
   */
  getVideoTransitionMatchNames(): Promise<string[]>;
};

export declare type TransitionFactory = {};

export declare type UniqueSerializeableStatic = {
  /**
   * Cast serializable object (ex. ProjectItem) into UniqueSerializeable
   *
   * @param item
   */
  cast(
    item: ProjectItem | ClipProjectItem | FolderItem | Sequence,
  ): UniqueSerializeable;
};

export declare type UniqueSerializeable = {
  /**
   * Get the unique ID of the serializeable object
   */
  getUniqueID(): Guid;
};

export declare type UtilsStatic = {
  /**
   * Check if AE is installed.
   */
  isAEInstalled(): Promise<boolean>;
};

export declare type Utils = {};

export declare type VideoClipTrackItemStatic = {
  /**
   * Empty Track Item Type
   * @readonly
   */
  readonly TRACKITEMTYPE_EMPTY: number;

  /**
   * Clip Track Item Type
   * @readonly
   */
  readonly TRACKITEMTYPE_CLIP: number;

  /**
   * Transition Track Item Type
   * @readonly
   */
  readonly TRACKITEMTYPE_TRANSITION: number;

  /**
   * Previe Track Item Type
   * @readonly
   */
  readonly TRACKITEMTYPE_PREVIEW: number;

  /**
   * Feedback Track Item Type
   * @readonly
   */
  readonly TRACKITEMTYPE_FEEDBACK: number;
};

export declare type VideoClipTrackItem = {
  /**
   * Create add transition action for sequence
   *
   * @param videoTransition
   * @param addTransitionOptionsProperties
   */
  createAddVideoTransitionAction(
    videoTransition: VideoTransition,
    addTransitionOptionsProperties?: AddTransitionOptions,
  ): Action;

  /**
   * Returns true if trackItem has transition
   *
   * @param transitionPosition Start or end position of transition
   */
  createRemoveVideoTransitionAction(
    transitionPosition?: Constants.TransitionPosition,
  ): Action;

  /**
   * Returns the value of internal matchname for this trackItem
   */
  getMatchName(): Promise<string>;

  /**
   * Returns the display name for trackItem
   */
  getName(): Promise<string>;

  /**
   * Returns if trackItem is selected or not
   */
  getIsSelected(): Promise<boolean>;

  /**
   * Returns the value of speed of the trackItem
   */
  getSpeed(): Promise<number>;

  /**
   * Returns true if the trackitem is an adjustment layer
   */
  isAdjustmentLayer(): Promise<boolean>;

  /**
   * Returns true if the trackitem is reversed
   */
  isSpeedReversed(): Promise<number>;

  /**
   * Returns an action that moves the inPoint of the track item to a new time, by shifting it by a number of seconds.
   *
   * @param tickTime
   */
  createMoveAction(tickTime: TickTime): Action;

  /**
   * Returns a TickTime object representing the track item in point relative to the start time of the project item referenced by this track item.
   */
  getInPoint(): Promise<TickTime>;

  /**
   * Returns a TickTime object representing the track item out point relative to the start time of the project item referenced by this track item.
   */
  getOutPoint(): Promise<TickTime>;

  /**
   * Create SetInPointAction for setting the track item in point relative to the start time of the project item referenced by this track item
   *
   * @param tickTime Sets the In-Point in TickTime
   */
  createSetInPointAction(tickTime: TickTime): Action;

  /**
   * Create SetOutPointAction for setting the track item out point relative to the start time of the project item referenced by this track item
   *
   * @param tickTime Sets the Out-Point in TickTime
   */
  createSetOutPointAction(tickTime: TickTime): Action;

  /**
   * Returns a TickTime object representing the starting sequence time of this track item relative to the sequence start time.
   */
  getStartTime(): Promise<TickTime>;

  /**
   * Returns a TickTime object representing the ending sequence time of this track item relative to the sequence start time.
   */
  getEndTime(): Promise<TickTime>;

  /**
   * Create set start time action for sequence
   *
   * @param tickTime
   */
  createSetStartAction(tickTime: TickTime): Action;

  /**
   * Create set end time action for sequence
   *
   * @param tickTime
   */
  createSetEndAction(tickTime: TickTime): Action;

  /**
   * Returns timecode representing the duration of this track item relative to the sequence start.
   */
  getDuration(): Promise<TickTime>;

  /**
   * Index representing the type of this track item.
   */
  getType(): Promise<number>;

  /**
   * Returns true if trackitem is muted/disabled
   */
  isDisabled(): Promise<boolean>;

  /**
   * Returns an action that enables/disables the trackItem
   *
   * @param disabled
   */
  createSetDisabledAction(disabled: boolean): Action;

  /**
   * Returns an action that renames the trackItem
   *
   * @param inName
   */
  createSetNameAction(inName: string): Action;

  /**
   * Returns UUID representing the underlying media type of this track item
   */
  getMediaType(): Promise<Guid>;

  /**
   * Index representing the track index of the track this track item belongs to
   */
  getTrackIndex(): Promise<number>;

  /**
   * Returns the project item for this track item.
   */
  getProjectItem(): Promise<ProjectItem>;

  /**
   * Returns VideoComponentChain
   */
  getComponentChain(): Promise<VideoComponentChain>;
};

export declare type VideoComponentChainStatic = {};

export declare type VideoComponentChain = {
  /**
   * Creates and returns an insert component action
   *
   * @param component Video filter component
   * @param componentInsertionIndex Index which the component shall be inserted
   */
  createInsertComponentAction(
    component: Component | VideoFilterComponent,
    componentInsertionIndex: number,
  ): Action;

  /**
   * Creates and returns an append component action
   *
   * @param component Video filter component
   */
  createAppendComponentAction(
    component: Component | VideoFilterComponent,
  ): Action;

  /**
   * Creates and returns an remove component action
   *
   * @param component Video filter component
   */
  createRemoveComponentAction(
    component: Component | VideoFilterComponent,
  ): Action;

  /**
   * Returns the component at the given index
   *
   * @param componentIndex
   * @returns Returns the component at the given index
   */
  getComponentAtIndex(componentIndex: number): Component;

  /**
   * Gets the number of components in the component chain
   */
  getComponentCount(): number;
};

export declare type VideoFilterComponentStatic = {};

export declare type VideoFilterComponent = {};

export declare type VideoFilterFactoryStatic = {
  /**
   * Creates a new video filter component based on the input matchName
   *
   * @param matchName The match name of the component to create, example 'PR.ADBE Solarize', 'AE.ADBE Mosaic' etc..
   */
  createComponent(matchName: string): Promise<VideoFilterComponent>;

  /**
   * Returns an array of video filter matchNames
   */
  getMatchNames(): Promise<string[]>;

  /**
   * Returns an array of video filter display names
   */
  getDisplayNames(): Promise<string[]>;
};

export declare type VideoFilterFactory = {};

export declare type VideoTrackStatic = {
  /**
   * Event Object for Track changed
   * @readonly
   */
  readonly EVENT_TRACK_CHANGED: string;

  /**
   * Event Object for Track Info Changed
   * @readonly
   */
  readonly EVENT_TRACK_INFO_CHANGED: string;

  /**
   * Event Object for Track Lock Changed
   * @readonly
   */
  readonly EVENT_TRACK_LOCK_CHANGED: string;
};

export declare type VideoTrack = {
  /**
   * sets the mute state of the track to muted/unmuted
   *
   * @param mute
   */
  setMute(mute: boolean): Promise<boolean>;

  /**
   * UUID representing the underlying media type of this track
   */
  getMediaType(): Promise<Guid>;

  /**
   * Index representing the track index of this track within the track group.
   */
  getIndex(): Promise<number>;

  /**
   * Get mute state of the track
   */
  isMuted(): Promise<boolean>;

  /**
   * Returns array of VideoClipTrackItem from the track item type
   *
   * @param trackItemType This values can be Empty (0), Clip (1), Transition (2), Preview (3) or Feedback (4)
   * @param includeEmptyTrackItems
   */
  getTrackItems(
    trackItemType: Constants.TrackItemType,
    includeEmptyTrackItems: boolean,
  ): VideoClipTrackItem[];

  /**
   * Get the name of the track
   * @readonly
   */
  readonly name: string;

  /**
   * The ID of the track within the TrackGroup
   * @readonly
   */
  readonly id: number;
};

export declare type VideoTransitionStatic = {
  /**
   * TransitionPosition: START
   * @readonly
   */
  readonly TRANSITIONPOSITION_START: number;

  /**
   * TransitionPosition: END
   * @readonly
   */
  readonly TRANSITIONPOSITION_END: number;
};

export declare type VideoTransition = {};

export declare type EventManagerStatic = {
  /**
   * add event listener to target object
   *
   * @param target
   * @param eventName
   * @param eventHandler
   * @param inCapturePhase?
   */
  addEventListener(
    target: Project | Sequence | VideoTrack | AudioTrack | EncoderManager,
    eventName:
      | string
      | Constants.SnapEvent
      | Constants.ProjectEvent
      | Constants.SequenceEvent
      | Constants.OperationCompleteEvent,
    eventHandler: (event?: object) => void,
    inCapturePhase?: boolean,
  ): void;

  /**
   * remove event listener from target object
   *
   * @param target
   * @param eventName
   * @param eventHandler
   */
  removeEventListener(
    target: Project | Sequence | VideoTrack | AudioTrack | EncoderManager,
    eventName:
      | string
      | Constants.SnapEvent
      | Constants.ProjectEvent
      | Constants.SequenceEvent
      | Constants.OperationCompleteEvent,
    eventHandler: (event?: object) => void,
  ): void;

  /**
   * add global event listener
   *
   * @param eventName
   * @param eventHandler
   * @param inCapturePhase?
   */
  addGlobalEventListener(
    eventName:
      | string
      | Constants.SnapEvent
      | Constants.ProjectEvent
      | Constants.SequenceEvent
      | Constants.OperationCompleteEvent,
    eventHandler: (event?: object) => void,
    inCapturePhase?: boolean,
  ): void;

  /**
   * remove global event listener
   *
   * @param eventName
   * @param eventHandler
   */
  removeGlobalEventListener(
    eventName:
      | string
      | Constants.SnapEvent
      | Constants.ProjectEvent
      | Constants.SequenceEvent
      | Constants.OperationCompleteEvent,
    eventHandler: (event?: object) => void,
  ): void;
};

export declare type EventManager = {};

export declare type TranscriptStatic = {
  /**
   * Returns TextSegments object initialized from jsonString
   *
   * @param jsonString
   */
  importFromJSON(jsonString: string): TextSegments;

  /**
   * Create action that import external transcripts to ClipProjectItem
   *
   * @param textSegments
   * @param clipProjectItem
   */
  createImportTextSegmentsAction(
    textSegments: TextSegments,
    clipProjectItem: ClipProjectItem,
  ): Action;

  /**
   * Export transcripts inside of clipProjectItem as JSON string if transcript exist
   *
   * @param clipProjectItem
   */
  exportToJSON(clipProjectItem: ClipProjectItem): Promise<string>;
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
